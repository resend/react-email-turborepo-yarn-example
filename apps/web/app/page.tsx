import { render } from '@react-email/render'
import { VercelInviteUserEmail } from 'transactional/emails/vercel-invite-user';

export default function Page(): JSX.Element {
  const html = render(VercelInviteUserEmail({}));

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}
