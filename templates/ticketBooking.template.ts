export const ticketBookingTemplate = (userName: string, eventName:string, eventDate: string, eventTime: string, seat_count: number, address:string)=>{
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Ticket Booked Successfully</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background-color:#f4f7fc;
    font-family:Arial, Helvetica, sans-serif;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    style="
      background-color:#f4f7fc;
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
            background-color:#ffffff;
            border-radius:18px;
            overflow:hidden;
            box-shadow:0 6px 18px rgba(0,0,0,0.08);
          "
        >

          <!-- Header -->
          <tr>
            <td
              align="center"
              style="
                background:linear-gradient(
                  90deg,
                  #4f46e5,
                  #7c3aed
                );
                padding:45px;
              "
            >
              <h1
                style="
                  margin:0;
                  color:#CA3838;
                  font-size:32px;
                "
              >
                🎟️ Ticket Confirmed
              </h1>

              <p
                style="
                  color:#1f2937;
                  margin-top:0;
                  font-size:25px;
                "
              >
                Your booking has been successfully confirmed.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:45px;">

              <h2
                style="
                  color:#1f2937;
                  margin-top:0;
                "
              >
                Hello ${userName},
              </h2>

              <p
                style="
                  color:#4b5563;
                  font-size:16px;
                  line-height:28px;
                "
              >
                Great news! Your tickets for
                <strong>${eventName}</strong>
                have been successfully booked.
              </p>

              <!-- Ticket Card -->
              <table
                width="100%"
                cellpadding="12"
                cellspacing="0"
                style="
                  margin-top:30px;
                  background-color:#f8fafc;
                  border:1px solid #e5e7eb;
                  border-radius:14px;
                "
              >

                <tr>
                  <td width="35%">
                    <strong>🎉 Event</strong>
                  </td>
                  <td>${eventName}</td>
                </tr>

                <tr>
                  <td>
                    <strong>📅 Date</strong>
                  </td>
                  <td>${eventDate}</td>
                </tr>

                <tr>
                  <td>
                    <strong>🕒 Time</strong>
                  </td>
                  <td>${eventTime}</td>
                </tr>

                <tr>
                  <td>
                    <strong>🎫 Seats Booked</strong>
                  </td>
                  <td>${seat_count}</td>
                </tr>

                <tr>
                  <td>
                    <strong>📍 Venue</strong>
                  </td>
                  <td>${address}</td>
                </tr>

              </table>

              <!-- Highlight -->
              <div
                style="
                  background:#ecfeff;
                  border-left:5px solid #06b6d4;
                  padding:20px;
                  margin-top:30px;
                  border-radius:10px;
                "
              >
                <p
                  style="
                    margin:0;
                    color:#0f172a;
                    font-size:15px;
                    line-height:28px;
                  "
                >
                  💡 Please arrive at the venue
                  at least
                  <strong>30 minutes before the event</strong>
                  to ensure a smooth entry experience.
                </p>
              </div>

              <!-- Button -->
              <div
                style="
                  text-align:center;
                  margin-top:40px;
                "
              >
                <a
                  href="http://localhost:3000/dashboard/my-tickets"
                  style="
                    display:inline-block;
                    padding:15px 35px;
                    background-color:#4f46e5;
                    color:#ffffff;
                    text-decoration:none;
                    border-radius:10px;
                    font-weight:bold;
                    font-size:16px;
                  "
                >
                  View My Tickets
                </a>
              </div>

              <p
                style="
                  margin-top:45px;
                  color:#6b7280;
                  font-size:15px;
                  line-height:28px;
                "
              >
                Thank you for choosing
                <strong>Event Booking Platform</strong>.
                We hope you have an amazing experience at
                <strong>${eventName}</strong>.
              </p>

              <p
                style="
                  margin-top:35px;
                  color:#111827;
                "
              >
                Regards,<br />
                <strong>Event Booking Team</strong>
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
              All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`
}