import { enGB } from "date-fns/locale";
// Customize the locale settings
const customLocale = {
  ...enGB,
  options: {
    ...enGB.options,
    weekStartsOn: 1, // Monday as the first day of the week
  },
};

export default customLocale;
