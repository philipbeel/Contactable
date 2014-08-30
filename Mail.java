//package your.package;

import java.io.IOException;

import javax.annotation.Resource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Rewrite of mail.php from Contactable, popup contact form jQuery plugin.
 *
 * @see https://github.com/philipbeel/contactable/
 * @see https://github.com/philipbeel/contactable/blob/master/mail.php
 *
 * @author Libor Jelinek, http://devblog.virtage.com/libor-jelinek/
 */
@WebServlet("/mail")
public class Mail extends HttpServlet {

	private static final long serialVersionUID = 1L;

	// === Obtain JNDI javax.mail.Session resource ===
	// a) Servlet 3.0+
	@Resource(name="mail/Session")
	private Session session;

	// b) Servlet < 3.0
//  private Session session;

//	@Override
//	public void init() throws ServletException {
//		try {
//			Context initContext = new InitialContext();
//			Context envContext = (Context) initContext.lookup("java:/comp/env");
//			this.session = (Session) envContext.lookup("mail/Session");
//		} catch (Exception ex) {
//			ex.printStackTrace();
//		}
//	}

	// For Tomcat you may supply javax.mail.Session as JNDI in context.xml.
	/*
	<Context path="/" reloadable="true">

	<!-- Default set of monitored resources -->
    <WatchedResource>WEB-INF/web.xml</WatchedResource>


	<!-- javax.mail.Session for Gmail / Google Apps -->
	<Resource name="mail/Session"
		auth="Container"
		type="javax.mail.Session"
		description=""

		mail.debug="false"

		mail.smtp.host="smtp.gmail.com"
		mail.smtp.auth="true"
		mail.smtp.starttls.enable="true"
		mail.smtp.port="587"

		mail.smtp.user="<username>"
		password="<password>"
		/>

	</Context>
	*/

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		String name = req.getParameter("name");
		String email = req.getParameter("email");
		String issue = req.getParameter("issue");
		String message = req.getParameter("message");
		String subject = req.getParameter("subject");

		// Set manually "to"
		String to = "CHANGE@YOURADDRESS.COM";
		// or retrieve from <context-param>
		//String to = req.getServletContext().getInitParameter("SOME-PARAM-NAME");

		String body = "<div>" +
			"<p><strong>Name:</strong> " + name + " <br />" +
			"<strong>E-mail:</strong> " + email + " <br />" +
			"<strong>Issue:</strong> " + issue + " </p>" +

			"<p><strong>Message:</strong> " + message + " </p>" +

			"<p><strong>Sending IP:</strong> " + req.getRemoteAddr()   + " <br />" +
			"<strong>Sent via:</strong> " + req.getServerName() + " </p>" +
			"</div>";

		resp.setContentType("application/json; charset=utf-8");

		Message msg = new MimeMessage(session);

		try {
			msg.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
			msg.setSubject(subject);
			msg.setContent(body, "text/html; charset=UTF-8");

			Transport.send(msg);

		} catch (MessagingException e) {
			resp.getWriter().print("{\"response\":\"failure\"}");

		}

		resp.getWriter().print("{\"response\":\"success\"}");
	}
}
