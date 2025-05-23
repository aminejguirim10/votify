import { links } from "@/constants"
import Image from "next/image"
import Link from "next/link"

export default function HomeFooter() {
  return (
    <footer className="py-4 md:py-8">
      <div className="mx-auto max-w-5xl px-6">
        <Link href="/" aria-label="go home" className="mx-auto block size-fit">
          <Image
            src={"/assets/logo.png"}
            width={215}
            height={187}
            className="size-8 md:size-10"
            alt="logo"
          />
        </Link>

        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="block text-muted-foreground duration-150 hover:text-primary"
            >
              <span>{link.title}</span>
            </Link>
          ))}
        </div>
        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          <Link
            href="https://www.linkedin.com/in/amine-jguirim-817a65267/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="block text-muted-foreground hover:text-primary"
          >
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
              ></path>
            </svg>
          </Link>
          <Link
            href="/https://www.facebook.com/amine.jguirim10/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="block text-muted-foreground hover:text-primary"
          >
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
              ></path>
            </svg>
          </Link>

          <Link
            href="/https://www.instagram.com/aminejguirim/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="block text-muted-foreground hover:text-primary"
          >
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
              ></path>
            </svg>
          </Link>
          <Link
            href="https://github.com/aminejguirim10"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="block text-muted-foreground hover:text-primary"
          >
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34a2.65 2.65 0 0 0-1.11-1.47c-.91-.63.07-.62.07-.62a2.1 2.1 0 0 1 1.53 1a2.13 2.13 0 0 0 2.9.83a2.14 2.14 0 0 1 .63-1.34c-2.22-.25-4.56-1.11-4.56-4.95a3.88 3.88 0 0 1 1-2.7a3.6 3.6 0 0 1 .1-2.66s.84-.27 2.75 1a9.5 9.5 0 0 1 5 0c1.9-1.32 2.74-1 2.74-1a3.6 3.6 0 0 1 .1 2.66a3.87 3.87 0 0 1 1 2.7c0 3.85-2.34 4.7-4.57 4.95a2.39 2.39 0 0 1 .68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z"
              ></path>
            </svg>
          </Link>
        </div>
        <span className="block text-center text-sm text-muted-foreground">
          {" "}
          © {new Date().getFullYear()} Votify, All rights reserved
        </span>
      </div>
    </footer>
  )
}
