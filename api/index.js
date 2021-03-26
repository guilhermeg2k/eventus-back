const express = require("express");
const router = express.Router();
const db = require('../database');

router.get('/events', async (req, res) => {
  try{
    const events = await db.getAllEvents();
    res.json(events);
  } catch(err) {
    res.sendStatus(500);
  }
});

router.get('/event/main', async(req, res) => {
  try{
    const event = await db.getEvent(1);
    res.json(event);
  } catch (err){
    console.log(err);
    res.sendStatus(400);
  }
});

router.get('/event/:id', async (req, res) => {
  const id = req.params.id;
  try{
    const event = await db.getEvent(id);
    res.json(event);
  } catch (err){
    console.log(err);
    res.sendStatus(400);
  }
});

router.post('/event', async (req, res) => {
  const {
    name,
    description,
    startDate,
    endDate,
    imageURL,
    location,
    place,
  } = req.body;
  try{
    await db.insertEvent(
      name,
      description,
      location,
      place,
      startDate,
      endDate,
      imageURL
    );
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.put('/event', async (req, res) => {
  const {
    id,
    name,
    location,
    description,
    place,
    startDate,
    endDate,
    imageURL
  } = req.body;
  try{
    console.log(req.body);
    await db.updateEvent(
      id,
      name,  
      description,
      location,
      place,
      startDate,
      endDate,
      imageURL
    );
    res.sendStatus(200);
  } catch (err){
    console.log(err);
    res.sendStatus(400);
  }
});

router.delete('/event/:id', async (req, res) => {
  const id = req.params.id;
  try{
    await db.deleteEvent(id);
    res.sendStatus(200);
  } catch (err){
    console.log(err);
    res.sendStatus(400);
  }
});

module.exports = router;