import { DropdownItem } from 'reactstrap';
import { NavDropdown } from './menu-components';
import { locales, languages } from '../../../config/translation';

export const LocaleMenu = ({
  currentLocale,
  onClick,
}: {
  currentLocale: string;
  onClick: (event: any) => void;
}) =>
  Object.keys(languages).length > 1 ? (
    <NavDropdown
      icon="flag"
      name={currentLocale ? languages[currentLocale].name : undefined}
    >
      {locales.map((locale) => (
        <DropdownItem key={locale} onClick={onClick} value={locale}>
          {languages[locale].name}
        </DropdownItem>
      ))}
    </NavDropdown>
  ) : null;
