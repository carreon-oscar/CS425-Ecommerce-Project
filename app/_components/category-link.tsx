import Link from 'next/link';
import { CatLinkProps } from '../interface';

export default function CategoryLink({
  linkTitle,
  linkRef,
  callback,
}: CatLinkProps) {
  return (
    <Link href={linkRef}>
      <span
        onMouseEnter={callback}
        className="text-lg link-underline link-underline-black p-3"
      >
        {linkTitle}
      </span>
    </Link>
  );
}
