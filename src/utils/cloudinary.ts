import { Cloudinary } from "@cloudinary/url-gen";

// Create a Cloudinary instance and set your cloud name.
const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'db9kkh0uw'
    }
});

export { cloudinary };