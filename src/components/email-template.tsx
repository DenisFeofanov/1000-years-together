interface EmailTemplateProps {
  fullName: string;
  email: string;
}

export const EmailTemplate = ({ fullName, email }: EmailTemplateProps) => (
  <div>
    <p>ФИО: {fullName}</p>
    <p>Почта: {email}</p>
  </div>
);
