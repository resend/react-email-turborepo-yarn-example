import { render } from '@react-email/render'
import { VercelInviteUserEmail } from '@repo/react-email-client/emails/vercel-invite-user-email';

export default function Page(): JSX.Element {
  const html = render(VercelInviteUserEmail());

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}
