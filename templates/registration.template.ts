export const registrationTemplate=(name:string, email:string, role:string)=>{
    
return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Welcome to Event Booking Platform</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f4f7fc;
    font-family: Arial, Helvetica, sans-serif;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    style="background-color: #f4f7fc; padding: 40px 0;"
  >
    <tr>
      <td align="center">

        <table
          width="600"
          cellpadding="0"
          cellspacing="0"
          style="
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          "
        >

          <!-- Header -->
          <tr>
            <td
              align="center"
              style="
                background: linear-gradient(
                  90deg,
                  #4f46e5,
                  #7c3aed
                );
                padding: 40px;
              "
            >
              <h1
                style="
                  color: white;
                  margin: 0;
                  font-size: 30px;
                "
              >
                🎉 Welcome to Event Booking
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2
                style="
                  color: #1f2937;
                  margin-top: 0;
                "
              >
                Hello ${name},
              </h2>

              <p
                style="
                  color: #4b5563;
                  font-size: 16px;
                  line-height: 28px;
                "
              >
                Thank you for registering with
                <strong>
                  Event Booking Platform
                </strong>.
              </p>

              <p
                style="
                  color: #4b5563;
                  font-size: 16px;
                  line-height: 28px;
                "
              >
                Your account has been created
                successfully and you're now ready
                to discover and book amazing
                events.
              </p>

              <!-- Account Information -->
              <table
                width="100%"
                cellpadding="10"
                cellspacing="0"
                style="
                  background-color: #f9fafb;
                  border-radius: 12px;
                  margin-top: 25px;
                "
              >
                <tr>
                  <td>
                    <strong>Name:</strong>
                  </td>
                  <td>${name}</td>
                </tr>

                <tr>
                  <td>
                    <strong>Email:</strong>
                  </td>
                  <td>${email}</td>
                </tr>

                <tr>
                  <td>
                    <strong>Role:</strong>
                  </td>
                  <td>${role}</td>
                </tr>
              </table>

              <div
                style="
                  text-align: center;
                  margin-top: 35px;
                "
              >
                <a
                  href="http://localhost:3000/login"
                  style="
                    display: inline-block;
                    padding: 14px 30px;
                    background-color: #4f46e5;
                    color: white;
                    text-decoration: none;
                    border-radius: 10px;
                    font-weight: bold;
                    font-size: 16px;
                  "
                >
                  Login Now
                </a>
              </div>

              <p
                style="
                  color: #6b7280;
                  font-size: 15px;
                  margin-top: 40px;
                  line-height: 28px;
                "
              >
                We're excited to have you with us.
                Start exploring events, reserve
                tickets, and enjoy unforgettable
                experiences.
              </p>

              <p
                style="
                  color: #1f2937;
                  margin-top: 35px;
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
                background-color: #f9fafb;
                padding: 25px;
                color: #6b7280;
                font-size: 13px;
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