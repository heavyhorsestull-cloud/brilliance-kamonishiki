function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date(),
      data.email,
      data.member_type === "houjin" ? "\u98F2\u98DF\u5E97" : "\u500B\u4EBA",
      data.shop_name || "",
      data.ref || "direct"
    ]);

    var subject = "\u3010\u52A0\u8302\u9326\u9152\u9020\u3011\u3054\u767B\u9332\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3059";
    var htmlBody = getEmailHtml(data.email);
    var textBody = getEmailText(data.email);

    GmailApp.sendEmail(data.email, subject, textBody, {
      name: "\u52A0\u8302\u9326\u9152\u9020",
      htmlBody: htmlBody,
      noReply: true
    });

    return ContentService
      .createTextOutput(JSON.stringify({ result: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getEmailText(email) {
  var lines = [
    email + " \u69D8",
    "",
    "\u3053\u306E\u5EA6\u306F\u3054\u767B\u9332\u3044\u305F\u3060\u304D\u3001\u8AA0\u306B\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3059\u3002",
    "",
    "\u8535\u304B\u3089\u76F4\u63A5\u3054\u6848\u5185\u3092\u304A\u5C4A\u3051\u3044\u305F\u3057\u307E\u3059\u3002",
    "\u4ECA\u3057\u3070\u3089\u304F\u304A\u5F85\u3061\u304F\u3060\u3055\u3044\u307E\u305B\u3002",
    "",
    "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501",
    "\u52A0\u8302\u9326\u9152\u9020\u682A\u5F0F\u4F1A\u793E",
    "\u3012959-1313 \u65B0\u6F5F\u770C\u52A0\u8302\u5E02\u4EF2\u753A3-3",
    "https://kamonishiki.com/",
    "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501",
    "",
    "\u203B \u3053\u306E\u30E1\u30FC\u30EB\u306F\u9001\u4FE1\u5C02\u7528\u3067\u3059\u3002\u3054\u8FD4\u4FE1\u3044\u305F\u3060\u3044\u3066\u3082\u304A\u7B54\u3048\u3067\u304D\u307E\u305B\u3093\u3002"
  ];
  return lines.join("\n");
}

function getEmailHtml(email) {
  var h = [];
  h.push("<!DOCTYPE html>");
  h.push("<html lang=\"ja\">");
  h.push("<head><meta charset=\"UTF-8\"></head>");
  h.push("<body style=\"margin:0;padding:0;background-color:#070707;\">");
  h.push("<table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color:#070707;\">");
  h.push("<tr><td align=\"center\" style=\"padding:40px 20px;\">");
  h.push("<table role=\"presentation\" width=\"560\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width:560px;width:100%;\">");

  h.push("<tr><td align=\"center\" style=\"padding:40px 0 30px;\">");
  h.push("<div style=\"width:36px;height:1px;background:#886c28;margin:0 auto;\"></div>");
  h.push("</td></tr>");

  h.push("<tr><td align=\"center\" style=\"padding:0 0 32px;\">");
  h.push("<p style=\"margin:0;font-family:Georgia,serif;font-size:22px;letter-spacing:0.22em;color:#d8b86a;\">");
  h.push("\u65E5\u672C\u3092\u3001\u91B8\u3059\u3002</p>");
  h.push("</td></tr>");

  h.push("<tr><td align=\"center\" style=\"padding:0 0 36px;\">");
  h.push("<div style=\"width:36px;height:1px;background:#886c28;margin:0 auto;\"></div>");
  h.push("</td></tr>");

  h.push("<tr><td style=\"padding:0 20px;\">");
  h.push("<p style=\"margin:0 0 28px;font-family:Georgia,serif;font-size:14px;line-height:2.4;letter-spacing:0.06em;color:#c8c1b6;text-align:center;\">");
  h.push(email + " \u69D8</p>");
  h.push("</td></tr>");

  h.push("<tr><td style=\"padding:0 20px;\">");
  h.push("<p style=\"margin:0 0 24px;font-family:Georgia,serif;font-size:14px;line-height:2.4;letter-spacing:0.06em;color:#c8c1b6;\">");
  h.push("\u3053\u306E\u5EA6\u306F\u3054\u767B\u9332\u3044\u305F\u3060\u304D\u3001<br>\u8AA0\u306B\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3059\u3002</p>");
  h.push("<p style=\"margin:0 0 24px;font-family:Georgia,serif;font-size:14px;line-height:2.4;letter-spacing:0.06em;color:#c8c1b6;\">");
  h.push("\u8535\u304B\u3089\u76F4\u63A5\u3054\u6848\u5185\u3092\u304A\u5C4A\u3051\u3044\u305F\u3057\u307E\u3059\u3002<br>");
  h.push("\u4ECA\u3057\u3070\u3089\u304F\u304A\u5F85\u3061\u304F\u3060\u3055\u3044\u307E\u305B\u3002</p>");
  h.push("</td></tr>");

  h.push("<tr><td align=\"center\" style=\"padding:36px 0;\">");
  h.push("<div style=\"width:36px;height:1px;background:#886c28;margin:0 auto;\"></div>");
  h.push("</td></tr>");

  h.push("<tr><td style=\"padding:0 20px 40px;\">");
  h.push("<p style=\"margin:0 0 6px;font-family:Arial,sans-serif;font-size:12px;letter-spacing:0.14em;color:#8a837c;text-align:center;line-height:2.2;\">");
  h.push("\u52A0\u8302\u9326\u9152\u9020\u682A\u5F0F\u4F1A\u793E<br>");
  h.push("\u3012959-1313 \u65B0\u6F5F\u770C\u52A0\u8302\u5E02\u4EF2\u753A3-3</p>");
  h.push("<p style=\"margin:12px 0 0;text-align:center;\">");
  h.push("<a href=\"https://kamonishiki.com/\" style=\"font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.2em;color:#886c28;text-decoration:none;\">kamonishiki.com</a></p>");
  h.push("</td></tr>");

  h.push("<tr><td style=\"padding:0 20px 40px;\">");
  h.push("<p style=\"margin:0;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.06em;color:#5a554f;text-align:center;line-height:2;\">");
  h.push("\u203B \u3053\u306E\u30E1\u30FC\u30EB\u306F\u9001\u4FE1\u5C02\u7528\u3067\u3059\u3002<br>\u3054\u8FD4\u4FE1\u3044\u305F\u3060\u3044\u3066\u3082\u304A\u7B54\u3048\u3067\u304D\u307E\u305B\u3093\u3002</p>");
  h.push("</td></tr>");

  h.push("</table>");
  h.push("</td></tr></table>");
  h.push("</body></html>");

  return h.join("");
}
