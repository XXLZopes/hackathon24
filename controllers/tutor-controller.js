const TutorSession = require(`../model/TutorSession`);
const Course = require(`../model/Course`);
const { ObjectId } = require(`mongoose`);

const tutorController = {
  createTutorSession({ body }, res) {
    const courseId = body.courseId;
    console.log("cn", courseId);

    Course.findById({ _id: courseId })
      .then((course) => {
        console.log("course", course);
        return course.courseName;
      })
      .then((courseName) => {
        // console.log(courseName);
        body.courseName = courseName;
        TutorSession.create(body)
          .then((newTutorSession) => {
            return res.status(200).json({
              message: `Created Tutor Session with tutor-id: ${body.tutorId} and course-id ${body.courseId} 
                has been created and added to the database.`,
              TutorSession: newTutorSession,
            });
          })
          .catch((err) => {
            console.log(
              "Something went wrong when attempting to create a new Tutor Session."
            );
            res.status(400).json(err);
          });
      });
  },

  getAllTutorSessions(req, res) {
    TutorSession.find({})
      .then((courses) => res.status(200).json(courses))
      .catch((err) => {
        console.error(
          "Something went wrong when trying to retrieve all the tutor sessions from the database."
        );
        res.status(500).json(err);
      });
  },

  getTutorSessionById(req, res) {
    const tutorSessionId = req.params.tutorSessionId;
    // Using findOne instead of find to ensure only one document is returned
    TutorSession.findOne({ _id: tutorSessionId })
      .select("-__v") // Excluding the __v field from the result
      .then((tutorSession) => {
        if (!tutorSession) {
          // Tutor session not found, send a 404 response
          return res
            .status(404)
            .json({ message: "No tutor session with that id found." });
        }
        // Tutor session found, send a 200 response with the session data
        return res.status(200).json(tutorSession);
      })
      .catch((err) => {
        // Error handling, log the error and send a 500 response
        console.error("Something went wrong", err);
        return res.status(500).json(err);
      });
  },

  getTutorSessionByCourseName(req, res) {
    const courseName = req.params.courseName;
    TutorSession.find({ courseName: courseName })
      .select("-__v")
      .then((tutorSessions) => res.status(200).json(tutorSessions))
      .catch((err) => {
        console.error(
          `Something went wrong when trying to retrieve tutor sessions with ID ${tutorID}: ${err}`
        );
        res.status(500).json(err);
      });
  },
  getTutorSessionByTutor(req, res) {
    //todo this wont work rn, if you want to test change it to params.tutorID
    const tutorID = req.session.userID;
    TutorSession.find({ tutorID: tutorID })
      .select("-__v")
      .then((tutorSessions) => res.status(200).json(tutorSessions))
      .catch((err) => {
        console.error(
          `Something went wrong when trying to retrieve tutor sessions with ID ${tutorID}: ${err}`
        );
        res.status(500).json(err);
      });
  },

  deleteTutorSessionBySessionID(req, res) {
    const sessionID = req.params.sessionID;
    TutorSession.findOneAndDelete({ _id: sessionID })
      .then((deletedSession) => {
        if (!deletedSession) {
          return res
            .status(404)
            .json({
              message: `No Tutor Session with the ID ${sessionID} found.`,
            });
        }
        return res.status(200).json({
          message: `Tutor Session with ID ${sessionID} successfully deleted.`,
          TutorSession: deletedSession,
        });
      })
      .catch((err) => {
        console.log(
          `Something went wrong when attempting to delete the Tutor Session with the _id ${sessionID}.`
        );
        return res.status(500).json(err);
      });
  },

  updateTutorSessionBySessionID(req, res) {
    const sessionID = req.params.sessionID;
    const updateData = req.body;

    for (const key in updateData) {
      if (!(key in TutorSession.schema.paths))
        return res
          .status(400)
          .json({
            message: `The Tutor Session schema does not have the property ${key}.`,
          });
    }
    TutorSession.findOneAndUpdate({ _id: sessionID }, updateData, { new: true })
      .then((updatedTutorSession) => {
        if (!updatedTutorSession)
          return res
            .status(404)
            .json({
              message: `No tutor session with the ID of ${sessionID} found.`,
            });
        return res.status(200).json({
          message: `Tutor Session with ID: ${sessionID} successfully updated.`,
          UpdatedTutorSession: updatedTutorSession,
        });
      })
      .catch((err) => {
        console.log(
          `Something went wrong when attempting to update the tutor session with the ID: ${sessionID}`
        );
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = tutorController;
