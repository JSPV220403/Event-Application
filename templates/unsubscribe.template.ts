export const unsubscribeTemplate = (
  name: string
) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Subscription Updated</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f4f7fc;
    font-family:Arial, Helvetica, sans-serif;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    style="
      background:#f4f7fc;
      padding:40px 0;
    "
  >
    <tr>
      <td align="center">

        <table
          width="650"
          cellpadding="0"
          cellspacing="0"
          style="
            background:#ffffff;
            border-radius:20px;
            overflow:hidden;
            box-shadow:
              0 10px 30px
              rgba(0,0,0,0.08);
          "
        >

          <!-- Header -->
          <tr>
            <td
              align="center"
              style="
                background:
                  linear-gradient(
                    135deg,
                    #6366f1,
                    #7c3aed
                  );
                padding:50px;
              "
            >
              <div
                style="
                  font-size:55px;
                  margin-bottom:15px;
                "
              >
                👋
              </div>

              <h1
                style="
                  margin:0;
                  color:white;
                  font-size:34px;
                "
              >
                Subscription Updated
              </h1>

              <p
                style="
                  color:#e9d5ff;
                  margin-top:15px;
                  font-size:17px;
                  line-height:30px;
                "
              >
                We've successfully updated your email preferences.
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:45px;">

              <h2
                style="
                  color:#111827;
                  margin-top:0;
                "
              >
                Hello ${name},
              </h2>

              <p
                style="
                  color:#4b5563;
                  font-size:16px;
                  line-height:30px;
                "
              >
                You've been unsubscribed from
                <strong>
                  Event Booking Platform's
                  promotional emails
                </strong>.
              </p>

              <table
                width="100%"
                cellpadding="20"
                cellspacing="0"
                style="
                  background:#f9fafb;
                  border-left:
                    6px solid
                    #6366f1;
                  border-radius:12px;
                  margin-top:25px;
                "
              >
                <tr>
                  <td>

                    <h3
                      style="
                        margin-top:0;
                        color:#111827;
                      "
                    >
                      What changes now?
                    </h3>

                    <p
                      style="
                        color:#4b5563;
                        line-height:30px;
                        margin-bottom:0;
                      "
                    >
                      ❌ No more promotional emails
                      about newly hosted events,
                      recommendations, or special
                      campaigns.
                    </p>

                    <p
                      style="
                        color:#4b5563;
                        line-height:30px;
                        margin-bottom:0;
                      "
                    >
                      ✅ You'll still receive
                      important transactional emails
                      such as ticket confirmations,
                      payment receipts, and event
                      reminders for your bookings.
                    </p>

                  </td>
                </tr>
              </table>

              <p
                style="
                  color:#6b7280;
                  font-size:15px;
                  line-height:30px;
                  margin-top:35px;
                "
              >
                If this was accidental,
                you can always subscribe again
                from your account settings.
              </p>

              <div
                style="
                  text-align:center;
                  margin-top:40px;
                "
              >
                <a
                  href="http://localhost:3000/profile"
                  style="
                    display:inline-block;
                    background:#6366f1;
                    color:white;
                    text-decoration:none;
                    padding:
                      15px 35px;
                    border-radius:12px;
                    font-size:16px;
                    font-weight:bold;
                  "
                >
                  Manage Preferences
                </a>
              </div>

              <p
                style="
                  color:#111827;
                  margin-top:45px;
                "
              >
                Thank you for being part of our
                community. We hope to see you
                again soon.
              </p>

              <p
                style="
                  color:#111827;
                  margin-top:35px;
                "
              >
                Regards,<br />
                <strong>
                  Event Booking Team
                </strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="
                background:#f9fafb;
                padding:25px;
                color:#6b7280;
                font-size:13px;
              "
            >
              © 2026 Event Booking Platform.
              Discover. Book. Experience.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;
};