import { render } from "@react-email/components";
import { VercelInviteUserEmail } from "transactional/emails/vercel-invite-user";

export default function Page(): JSX.Element {
	const html = render(VercelInviteUserEmail({}));

	// biome-ignore lint/security/noDangerouslySetInnerHtml: we need to render the email
	return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
