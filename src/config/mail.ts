interface IMailConfig {
  driver: 'ethereal' | 'ses' | 'gmail';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

const fromEmailName = process.env.EMAIL_FROM_NAME;
const fromEmail = process.env.EMAIL_FROM;

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: fromEmail,
      name: fromEmailName,
    },
  },
} as IMailConfig;
