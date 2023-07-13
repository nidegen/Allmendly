import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import * as logger from "firebase-functions/logger";

export function application() {
  const app = express();
  app.use(bodyParser.text());
  app.use(cors({ origin: true }));

  app.all('/test', (req: express.Request, res: express.Response) => {
    console.log(req.headers);
    console.log(req.baseUrl);
    console.log(req.params);
    console.log(req.path);
    console.log(req.method);
    console.log(req.originalUrl);
    console.log(req.body.toString());
    res.status(200).send(propfindResponse);
  });
  app.all('/test/*', (req: express.Request, res: express.Response) => {
    console.log(req);

    res.status(200).send(generateExampleCalendar());
  });
  return app;
}

const propfindResponse = `
<?xml version="1.0" encoding="UTF-8"?>
<d:multistatus xmlns:A="DAV:">
  <d:response>
    <d:href>http://example.com/path/to/resource</d:href>
    <d:propstat>
      <d:status>HTTP/1.1 200 OK</d:status>
      <d:prop>
        <d:current-user-principal>
          <d:href>http://example.com/principals/user/testsdd</d:href>
        </d:current-user-principal>
        <d:principal-URL>
          <d:href>http://example.com/principals/user/testsdd</d:href>
        </d:principal-URL>
      </d:prop>
    </d:propstat>
  </d:response>
</d:multistatus>
`

function generateExampleCalendar(): string {
  logger.log('test cal');
  const calendar = `
    BEGIN:VCALENDAR
    VERSION:2.0
    PRODID:-//OpenAI//CalDAV Server//EN
    BEGIN:VEVENT
    UID:12345
    SUMMARY:Example Event
    DTSTART:20230711T090000Z
    DTEND:20230711T100000Z
    END:VEVENT
    END:VCALENDAR
  `;

  return calendar;
}
