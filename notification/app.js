const express = require("express");
const app = express();
const port = process.env.PORT || 3004;
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const countdown = require("countdown");

const cron = require("node-cron");
cron.schedule("0 0 0 1-7 * *", () => {
  chackNotifOneDay();
});
cron.schedule("0 0 1  * *", () => {
  chackNotifOneHour();
});
//kalo m,au test
// cron.schedule("* * * * *", () => {
//   chackNotifOneDay();
// });

const { Assignment, Batch, Phase, PhaseBatch, User } = require("./models/");
const chackNotifOneDay = async () => {
  try {
    let assignmentData = await Assignment.findAll({
      include: {
        model: Phase,
        include: {
          model: PhaseBatch,
          include: User,
        },
      },
    });
    assignmentData.forEach((assignment) => {
      let startBatch = new Date(
        assignment.Phase.PhaseBatches[0].startedAt
      ).getTime();
      let dHari = Math.floor(assignment.deadline / 1440);
      let dJam = Math.floor((assignment.deadline - dHari * 1440) / 60);
      let dMenit = assignment.deadline - (dHari * 1440 + dJam * 60);
      let start = (assignment.week - 1) * 7 + assignment.day;
      start = start * 24 * 60 * 60 * 1000;
      const dateStart = new Date(startBatch + start).getTime();
      let endDate =
        dateStart +
        (dHari - 1) * 24 * 60 * 60 * 1000 +
        dJam * 60 * 60 * 1000 +
        dMenit * 60 * 1000;
      const deadline = countdown(
        new Date(),
        new Date(endDate),
        countdown.DAYS | countdown.HOURS | countdown.MINUTES
      );
      let studentPhase = assignment.Phase.PhaseBatches[0].Users;
      if (deadline.value > 0) {
        if (deadline.days == 2 || deadline.days == 1 || deadline.days == 3) {
          studentPhase.forEach((el) => {
            sendPushNotification(
              el.expo_token,
              ` Pengumpulan ${assignment.title}`,
              `Deadline Pengumpulan ${deadline.days} hari lagi`
            );
          });
        }
        // kalo mau test
        // studentPhase.forEach((el) => {
        //   sendPushNotification(
        //     el.expo_token,
        //     ` Pengumpulan ${assignment.title}`,
        //     `Deadline Pengumpulan ${deadline.days} hari lagi`
        //   );
        // });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
const chackNotifOneHour = async () => {
  try {
    let assignmentData = await Assignment.findAll({
      include: {
        model: Phase,
        include: {
          model: PhaseBatch,
          include: User,
        },
      },
    });
    assignmentData.forEach((assignment) => {
      let startBatch = new Date(
        assignment.Phase.PhaseBatches[0].startedAt
      ).getTime();
      let dHari = Math.floor(assignment.deadline / 1440);
      let dJam = Math.floor((assignment.deadline - dHari * 1440) / 60);
      let dMenit = assignment.deadline - (dHari * 1440 + dJam * 60);
      let start = (assignment.week - 1) * 7 + assignment.day;
      start = start * 24 * 60 * 60 * 1000;
      const dateStart = new Date(startBatch + start).getTime();
      let endDate =
        dateStart +
        (dHari - 1) * 24 * 60 * 60 * 1000 +
        dJam * 60 * 60 * 1000 +
        dMenit * 60 * 1000;
      const deadline = countdown(
        new Date(),
        new Date(endDate),
        countdown.DAYS | countdown.HOURS | countdown.MINUTES
      );
      let studentPhase = assignment.Phase.PhaseBatches[0].Users;
      if (deadline.value > 0 && deadline.days == 0) {
        if (
          deadline.hours == 6 ||
          deadline.hours == 12 ||
          deadline.hours == 3
        ) {
          studentPhase.forEach((el) => {
            sendPushNotification(
              el.expo_token,
              ` Pengumpulan ${assignment.title}`,
              `Deadline Pengumpulan ${deadline.days} hari lagi`
            );
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

async function sendPushNotification(expoToken, title, body) {
  const message = {
    to: expoToken,
    sound: "default",
    title: title,
    body: body,
  };

  let result = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
