const StudyGroupSession = require("../model/StudyGroupSession");
const Course = require(`../model/StudyGroupSession`);
const {ObjectId} = require(`mongoose`);

const studyGroupController = {
    createStudyGroup({ body },res) {
        StudyGroupSession.create(body)
        .then((newStudyGroup) => {
            return res.status(200).json({
                message: `Course with id: ${body._id} has been created and added to the database.`,
                StudyGroup: newStudyGroup
            })
        })
        .catch((err) => {
            console.log("Something went wrong when attempting to create a new Study Group.");
            console.log(err);
            res.status(400).json(err)
        });
    },
    deleteStudyGroup(req,res) {
        const sessionID = req.params.sessionID;
        StudyGroupSession.findOneAndDelete({_id: sessionID })
        .then((deletedSession) => {
            if (!deletedSession) {
                return res.status(404).json({ message: `No Study Group Session with the ID ${sessionID} found.` });
            }
            return res.status(200).json({ 
                message: `Study Group Session with ID ${sessionID} successfully deleted.`,
                StudyGroupSession: deletedSession,
            });
        })
        .catch((err) => {
            console.log(
                `Something went wrong when attempting to delete the Study Group Session with the _id ${sessionID}.`
            );
            return res.status(500).json(err);
        });
    },
    updateStudyGroup(req,res) {
        const sessionID = req.params.sessionID;
        const updateData = req.body;
          
        for (const key in updateData) {
            if (!(key in StudyGroupSession.schema.paths))
                return res.status(400).json({message: `The Study Group Session schema does not have the property ${key}.`});
        }
        StudyGroupSession.findOneAndUpdate({ _id: sessionID}, updateData, {new: true})
        .then((updatedStudySession) => {
            if (!updatedStudySession)
                return res.status(404).json({message: `No study group session with the ID of ${sessionID} found.`});
            return res.status(200).json({
                message: `Study Group Session with ID: ${sessionID} successfully updated.`,
                UpdatedStudyGroupSession: updatedStudySession
            });
        })
        .catch((err) => {
            console.log(`Something went wrong when attempting to update the tutor session with the ID: ${sessionID}`);
            console.log(err)
            res.status(500).json(err);
        });
    },
    getAllStudyGroups(req,res) {
        StudyGroupSession.find({})
        .select("-__v")
        .then((groups) => res.status(200).json(groups))
        .catch((err) => {
            console.error("Something went wrong when trying to retrieve all the study groups from the database.");
            res.status(500).json(err);
        });
    },
    getStudyGroupByID(req,res) {
        const sessionID = req.params.sessionID;
        StudyGroupSession.find({_id: sessionID})
        .select("-__v")
        .then((studySessions) => res.status(200).json(studySessions))
        .catch((err) => {
            console.error(`Something went wrong when trying to retrieve study group sessions with ID ${sessionID}: ${err}`);
            res.status(500).json(err);
        });
    }
}

module.exports = studyGroupController;




