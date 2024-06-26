const express = require('express');
const fileUpload = require('express-fileupload');
const admin = require('firebase-admin');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const serviceAccount = require('./firebase-service-account.json');

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://phonebook2-482e9.appspot.com'
});

const bucket = admin.storage().bucket();

app.use(cors());
app.use(fileUpload());

app.post('/upload', async (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).send('No file uploaded.');
  }

  const image = req.files.image;
  const blob = bucket.file(`demo1/${uuidv4()}_${image.name}`);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  });

  blobStream.on('error', (err) => {
    res.status(500).send({ error: err.message });
  });

  blobStream.on('finish', async () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    res.status(200).send({ url: publicUrl });
  });

  blobStream.end(image.data);
});

app.get('/images', async (req, res) => {
  try {
    const [files] = await bucket.getFiles({ prefix: 'demo1/' });
    const urls = await Promise.all(files.map(file => file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491'
    })));

    res.status(200).send(urls.flat());
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
