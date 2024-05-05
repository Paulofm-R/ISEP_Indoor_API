const Beacon = require('../models/beacons.model.js');
const utilities = require('../utilities/utilities')

exports.create = async (req, res) => {
    // Create new beacon
    const beacon = new Beacon ({
        position: req.body.position,
        floor: req.body.floor,
        locationType: req.body.locationType,
        inDoor: req.body.inDoor
    });
    
    try {
       
        // Save it in the data base
       await beacon.save();
       return res.status(201).json({
        success: true, 
        msg: "Beacon was added successfully.",
        URL: `/beacon/${beacon._id}`
       });

    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach((key) => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msgs: errors });
        } else {
            return res.status(500).json({
                success: false, msg: err.message || "An error occurred while creating the beacon."
            });
        }
    }
}

exports.getAll = async (req, res) => {
    try {
        // codigo para terem acesso a lista de beacons
        let data = await Beacon
        .find()
        .select('position floor locationType inDoor')
        .exec();

        return res.status(200).json({success: true, beacon: data});
    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach(key => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msg: err.message || "An error occurred while retrieving beacons." })
        }
    }
}

exports.findBeacon = async (req, res) => {
    try {
        // codigo para encontrar um beacom (como o beacomID)
        const beacon = await Beacon.findById(req.params.beaconID).exec();

        if (beacon === null)
            return res.status(404).json({ success: false, msg: `Could not find any beacon with the ID ${req.params.beaconID}.`});

        return res.json({success: true, beacon: beacon});

    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach(key => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msg: `Error retrieving beacon ID ${req.params.beaconID}.` })
        }
    }
}

exports.update = async (req, res) => {
    try {
        // codigo para fazer alterações no beacon
        const beacon = await Beacon.findByIdAndUpdate(req.params.beaconID, req.body).exec();

        if(!beacon){
            return res.status(404).json({success: true, msg: `Cannot update beacon with id=${req.params.beaconID}. Check if beacon exists!`});
        }

        return res.status(200).json({ success: true, msg: `Beacon id=${req.params.beaconID} has been updated successfully!` });
    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach(key => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msg: `Error when changing beacon ID ${req.params.beaconID}.` })
        }
    }
}

exports.delete = async (req, res) => {
    try {
        // codigo para eliminar um beacom
        const beacon = await Beacon.findOneAndDelete({ _id: req.params.beaconID }).exec();

        if(!beacon){
            return res.status(404).json({ message: `It is not possible to delete the beacon with id=${req.params.beaconID}. Perhaps the beacon was not found!` });
        } else {
            return res.status(200).json({ message: `Beacon with id=${req.params.beaconID} was successfully deleted` })
        }
    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach(key => {
                errors.push(err.errors[key].message);
            });
            return res.status(500).json({ success: false, msg: `Error deleting beacon with ID ${req.params.beaconID}.` })
        }
    }
}