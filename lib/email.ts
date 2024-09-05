export const createNewUserTeamplate = (name: string) => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <div
    style="
      display: none;
      overflow: hidden;
      line-height: 1px;
      opacity: 0;
      max-height: 0;
      max-width: 0;
    "
  >
    Congratulations, you joined the Votify website
    <div>
       ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
    </div>
  </div>

  <body
    style="
      background-color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    "
  >
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width: 37.5em; margin: 0 auto; padding: 20px 0 48px"
    >
      <tbody>
        <tr style="width: 100%">
          <td>
            <img
              alt="Votify"
              height="50"
              width="50"
              src="${process.env.NEXTAUTH_URL}/assets/logo.png"
              style="
                display: block;
                outline: none;
                border: none;
                text-decoration: none;
                margin: 0 auto;
              "
              width="170"
            />
            <p style="font-size: 16px; line-height: 26px; margin: 16px 0">
              Hi
              <!-- -->${name}<!-- -->,
            </p>
            <p style="font-size: 16px; line-height: 26px; margin: 16px 0">
              Welcome to Votify, the platform that lets you create, share and
              vote on what matters most to you.
            </p>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="text-align: center"
            >
              <tbody>
                <tr>
                  <td>
                    <a
                      href="${process.env.NEXTAUTH_URL}"
                      style="
                        line-height: 100%;
                        text-decoration: none;
                        display: block;
                        max-width: 100%;
                        background-color: #fca33b;
                        border-radius: 3px;
                        color: #fff;
                        font-size: 16px;
                        text-align: center;
                        padding: 12px;
                        color-scheme: light; /* Forces light mode */
                        -webkit-text-fill-color: #fff; /* Ensures text color remains white */
                        -webkit-background-clip: text; /* For background clipping */
                      "
                      target="_blank"
                    >
                      <span
                        ><!--[if mso
                          ]><i
                            style="
                              letter-spacing: 12px;
                              mso-font-width: -100%;
                              mso-text-raise: 18;
                            "
                            hidden
                            >&nbsp;</i
                          ><!
                        [endif]--></span
                      >
                      <span
                        style="
                          max-width: 100%;
                          display: inline-block;
                          line-height: 120%;
                          mso-padding-alt: 0px;
                          mso-text-raise: 9px;
                        "
                        >Get started</span
                      >
                      <span
                        ><!--[if mso
                          ]><i
                            style="letter-spacing: 12px; mso-font-width: -100%"
                            hidden
                            >&nbsp;</i
                          ><!
                        [endif]--></span
                      >
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <p style="font-size: 16px; line-height: 26px; margin: 16px 0">
              Best,<br />The Votify team
            </p>
            <hr
              style="
                width: 100%;
                border: none;
                border-top: 1px solid #eaeaea;
                border-color: #dfe1e4;
              "
            />
            <p
              style="
                font-size: 12px;
                line-height: 24px;
                color: #8898aa;
                text-decoration-line: none;
              "
            >
              Amine Jguirim, Monastir, TN 5035
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`
}
