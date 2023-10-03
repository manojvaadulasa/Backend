const express = require('express');
const router = express.Router();

const Details = require('../Models/Form');


router.post('/create', async (req, res) =>  {
        try {
            if (req.method === 'POST') {
                const details = new Details(req.body);
                    
                const requiredFields = [{ key: 'name', message: 'Name field is required' }, { key: 'gender', message: 'Gender field is required' }, { key: 'address', message: 'Address field is required' }];
                for (const field of requiredFields) {
                    if (!details[field.key]) {
                        return res.status(400).json({ error: field.message });
                    }
                }
                await details.save();
                res.status(201).json({ success: 'Details Added successfully' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
);



router.get('/read', async (req, res) => {
    try {
      const details = await Details.find();
      res.status(200).json(details);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });


  router.put('/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedDetails = await Details.findByIdAndUpdate(id, updatedData, { new: true });

      if (!updatedDetails) {
        return res.status(404).json({ error: 'Details not found' });
      }
  
      res.status(200).json(updatedDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });



router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDetails = await Details.findByIdAndRemove(id);

    if (!deletedDetails) {
      return res.status(404).json({ error: 'Details not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;