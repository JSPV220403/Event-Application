export const remainderEmailTemplate = (name:string, email:string, eventName:string, seatCount:number, address:string, eventDate:string, time:string)=>{
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Event Reminder</title>
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
            background:#ffffff;
            border-radius:20px;
            overflow:hidden;
            box-shadow:0 8px 20px rgba(0,0,0,0.08);
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
                padding:50px;
              "
            >
              <div style="font-size:60px;">
                🎉
              </div>

              <h1
                style="
                  margin:15px 0 0;
                  color:#5BF527;
                  font-size:34px;
                "
              >
                Your Event is Tomorrow!
              </h1>

              <p
                style="
                  margin-top:15px;
                  color:#5BF527;
                  font-size:18px;
                  line-height:30px;
                "
              >
                Get ready for an amazing experience.
                We're excited to see you!
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
                Hello ${name},
              </h2>

              <p
                style="
                  color:#4b5563;
                  font-size:16px;
                  line-height:30px;
                "
              >
                This is a friendly reminder that your booked event
                <strong>${eventName}</strong>
                is happening tomorrow.
              </p>

              <!-- Event Card -->
              <table
                width="100%"
                cellpadding="12"
                cellspacing="0"
                style="
                  margin-top:30px;
                  background:#f8fafc;
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
                  <td>${time}</td>
                </tr>

                <tr>
                  <td>
                    <strong>🎫 Reserved Seats</strong>
                  </td>
                  <td>${seatCount}</td>
                </tr>

                <tr>
                  <td>
                    <strong>📍 Venue</strong>
                  </td>
                  <td>${address}</td>
                </tr>

                <tr>
                  <td>
                    <strong>📧 Email</strong>
                  </td>
                  <td>${email}</td>
                </tr>

              </table>

              <!-- Reminder Box -->
              <div
                style="
                  background:#eef2ff;
                  border-left:5px solid #4f46e5;
                  padding:22px;
                  margin-top:35px;
                  border-radius:12px;
                "
              >
                <h3
                  style="
                    margin-top:0;
                    color:#4338ca;
                  "
                >
                  ✅ Before You Go
                </h3>

                <p
                  style="
                    margin:10px 0;
                    color:#374151;
                    line-height:28px;
                  "
                >
                  • Arrive at least 30 minutes before the event starts.
                </p>

                <p
                  style="
                    margin:10px 0;
                    color:#374151;
                    line-height:28px;
                  "
                >
                  • Keep this email handy for quick reference.
                </p>

                <p
                  style="
                    margin:10px 0;
                    color:#374151;
                    line-height:28px;
                  "
                >
                  • Bring any identification documents if required.
                </p>
              </div>

              <!-- Excitement Section -->
              <div
                style="
                  text-align:center;
                  margin-top:45px;
                "
              >
                <div
                  style="
                    font-size:50px;
                    margin-bottom:10px;
                  "
                >
                  🚀
                </div>

                <h2
                  style="
                    color:#4338ca;
                    margin-bottom:10px;
                  "
                >
                  See You Tomorrow!
                </h2>

                <p
                  style="
                    color:#6b7280;
                    font-size:16px;
                    line-height:30px;
                  "
                >
                  Thank you for choosing
                  <strong>Event Booking Platform</strong>.
                  We hope you have an unforgettable experience at
                  <strong>${eventName}</strong>.
                </p>
              </div>

              <p
                style="
                  margin-top:45px;
                  color:#111827;
                  line-height:30px;
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