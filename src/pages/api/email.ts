import { EmailTemplate } from "@/components/email-template";
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { fullName, email } = req.body;

  try {
    const data = await resend.emails.send({
      from: "Auto generated email <onboarding@resend.dev>",
      to: "sendfeedback1000yearstogether@outlook.com",
      subject: "1000 years together feedback",
      react: EmailTemplate({ fullName, email }),
    });

    if (data.error !== null) throw data.error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default POST;
