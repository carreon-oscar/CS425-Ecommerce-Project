import Link from 'next/link';
import { CatLinkProps } from '../interface';

export default function CategoryLink({
  linkTitle,
  linkRef,
  handleDropDownOpen,
  handleDropDownExit,
}: CatLinkProps) {
  return (
    <Link href={linkRef} onClick={() => handleDropDownExit(false)}>
      <span
        onMouseEnter={handleDropDownOpen}
        className="text-lg link-underline link-underline-black p-3"
      >
        {linkTitle}
      </span>
    </Link>
  );
}
