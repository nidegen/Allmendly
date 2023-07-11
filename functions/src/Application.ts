import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import * as logger from "firebase-functions/logger";

export function application() {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors({ origin: true }));

  app.get('/test', (_: express.Request, res: express.Response) => {
    res.status(200).send(generateExampleCalendar());
  });
  return app;
}

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
