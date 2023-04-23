import Image from "next/image";
import Link from "next/link";

export const Header = () => (
  <header>
    <div>
      <div className="topNav">
        <Image src="/next.svg" alt="logo image" width={100} height={100} />
        <nav>
          <ul>
            <li>
              <Link href="/" passHref>
                Home
              </Link>
            </li>
            <li>
              <Link href="/events" passHref>
                Events
              </Link>
            </li>
            <li>
              <Link href="/aboutus" passHref>
                About Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <h1>Lorem ipsum dolor sit amet.</h1>
    </div>
  </header>
);
