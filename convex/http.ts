import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) throw new Error("Missing CLERK_WEBHOOK_SECRET");

    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");
    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("Missing Svix headers", { status: 400 });
    }

    const rawBody = await request.text();
    const webhook = new Webhook(webhookSecret);

    let event: any;
    try {
      event = webhook.verify(rawBody, {
        "svix-id": svix_id,
        "svix-signature": svix_signature,
        "svix-timestamp": svix_timestamp,
      });
    } catch (err) {
      console.error("Webhook verification failed:", err);
      return new Response("Invalid webhook", { status: 400 });
    }

    // Handle Clerk user.created event
    if (event.type === "user.created") {
      const user = event.data;
      const email = user.email_addresses?.[0]?.email_address || "";
      const firstName = user.first_name || "";
      const lastName = user.last_name || "";
      const fullName = `${firstName} ${lastName}`.trim() || email.split("@")[0];
      const image = user.image_url || "https://www.gravatar.com/avatar?d=mp";
      const clerkId = user.id;
      const username = email.split("@")[0];

      if (!email || !clerkId) {
        console.error("Missing required user fields.");
        return new Response("Missing user info", { status: 400 });
      }

      try {
        await ctx.runMutation(api.users.createUser, {
          email,
          fullname: fullName,
          image,
          clerkId,
          username,
        });
        console.log("✅ Email/password user saved");
      } catch (err) {
        console.error("❌ Failed to save user:", err);
        return new Response("Error", { status: 500 });
      }
    }

    return new Response("Webhook handled", { status: 200 });
  }),
});

export default http;
