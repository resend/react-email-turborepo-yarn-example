import { SendEmailCommandInput, SES } from "@aws-sdk/client-ses";
import { render } from "@react-email/components";
import VercelInvite from "@repo/transactional/emails/vercel-invite-user";
import { env } from "@/app/env.mjs";
import { EmailSchema } from "@/app/types/custom";

const ses = new SES({
  credentials: {
    accessKeyId: env.AWS_EMAIL_ACCESS_KEY,
    secretAccessKey: env.AWS_EMAIL_SECRET_ACCESS_KEY,
  },
  region: env.AWS_EMAIL_REGION,
});

export async function POST(req: Request) {
  console.log("called post");
  const body = await req.json();
  const result = EmailSchema.safeParse(body);

  if (!result.success) {
    return new Response(JSON.stringify({ error: result.error.issues }), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  const { name: NAME, email, subject } = result.data;

  console.log("=================================================");
  console.log("Name, email, subject", NAME, email, subject);
  console.log("=================================================");
  const emailHtml = await render(
    VercelInvite({
      username: "alanturing",
      userImage: `/static/vercel-user.png`,
      invitedByUsername: "Alan",
      invitedByEmail: "alan.turing@example.com",
      teamName: "Enigma",
      teamImage: `/static/vercel-team.png`,
      inviteLink: "https://vercel.com/teams/invite/foo",
      inviteFromIp: "204.13.186.218",
      inviteFromLocation: "São Paulo, Brazil",
    })
  );

  const params: SendEmailCommandInput = {
    Source: "parthvsquare@todo.com",
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailHtml,
        },
      },
      Subject: { Charset: "UTF-8", Data: subject },
    },
  };

  try {
    const response = await ses.sendEmail(params);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error: any) {
    console.log("error", error);
    return new Response(error.response, {
      status: 500,
      headers: {
        "content-type": "application/json",
      },
    });
  }
}
