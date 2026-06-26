export const eventPromotionTemplate = (
  eventName: string,
  eventDescription: string,
  organizer: string,
  userId: string
) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>${eventName}</title>
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

          <!-- Hero -->
          <tr>
            <td
              align="center"
              style="
                background:
                  linear-gradient(
                    135deg,
                    #4f46e5,
                    #7c3aed,
                    #9333ea
                  );
                padding:55px 40px;
              "
            >
              <div
                style="
                  font-size:52px;
                  margin-bottom:15px;
                "
              >
                🎉
              </div>

              <h1
                style="
                  margin:0;
                  color:green;
                  font-size:34px;
                "
              >
                New Event Just Dropped!
              </h1>

              <p
                style="
                  color:red;
                  font-size:18px;
                  margin-top:18px;
                  line-height:30px;
                "
              >
                Discover something amazing and create unforgettable memories.
              </p>
            </td>
          </tr>

          <!-- Event Section -->
          <tr>
            <td style="padding:45px;">

              <h2
                style="
                  color:#111827;
                  margin-top:0;
                  font-size:30px;
                  text-align:center;
                "
              >
                ${eventName}
              </h2>

              <table
                width="100%"
                cellpadding="20"
                cellspacing="0"
                style="
                  margin-top:30px;
                  background:#f9fafb;
                  border-radius:15px;
                  border-left:
                    6px solid #4f46e5;
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
                      📖 About This Event
                    </h3>

                    <p
                      style="
                        color:#4b5563;
                        font-size:16px;
                        line-height:30px;
                        margin-bottom:0;
                      "
                    >
                      ${eventDescription}
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Organizer -->
              <div
                style="
                  margin-top:35px;
                  padding:20px;
                  background:#eef2ff;
                  border-radius:12px;
                "
              >
                <h3
                  style="
                    margin-top:0;
                    color:#4f46e5;
                  "
                >
                  👤 Hosted By
                </h3>

                <p
                  style="
                    margin-bottom:0;
                    color:#374151;
                    font-size:17px;
                  "
                >
                  ${organizer}
                </p>
              </div>

              <!-- CTA -->
              <div
                style="
                  text-align:center;
                  margin-top:45px;
                "
              >
                <a
                  href="http://localhost:3000/dashboard/events"
                  style="
                    display:inline-block;
                    background:#4f46e5;
                    color:white;
                    text-decoration:none;
                    padding:16px 36px;
                    border-radius:12px;
                    font-size:16px;
                    font-weight:bold;
                  "
                >
                  🎟 Explore Events
                </a>
              </div>

              <p
                style="
                  color:#6b7280;
                  line-height:30px;
                  font-size:15px;
                  margin-top:45px;
                  text-align:center;
                "
              >
                Don't miss your chance to be part of this experience.
                Popular events fill up quickly, so book your seats early!
              </p>

              <p
                style="
                  color:#111827;
                  margin-top:40px;
                  text-align:center;
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
              "
            >

              <p
                style="
                  margin:0;
                  color:#6b7280;
                  font-size:13px;
                "
              >
                © 2026 Event Booking Platform.
                Discover. Book. Experience.
              </p>

              <p
                style="
                  margin-top:18px;
                  font-size:12px;
                  color:#9ca3af;
                "
              >
                Don't want to receive promotional emails?

                <a
                  href="http://localhost:8000/api/user/unsubscribe?userId=${userId}"
                  style="
                    color:#4f46e5;
                    text-decoration:none;
                    font-weight:bold;
                  "
                >
                  Unsubscribe
                </a>
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`
};