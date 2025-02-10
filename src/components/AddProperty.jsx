import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { X, Upload, PlusCircle } from "lucide-react";

const AddProperty = () => {
  const navigate = useNavigate();

  const generalFields = [
    { name: "name", type: "text", placeholder: "Property Name" },
    { name: "buildYear", type: "number", placeholder: "Year Built" },
    { name: "address", type: "text", placeholder: "Address" },
    { name: "city", type: "text", placeholder: "City" },
    { name: "stateOrRegion", type: "text", placeholder: "State / Region" },
    { name: "zip", type: "text", placeholder: "Zip" },
    { name: "country", type: "text", placeholder: "Country" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    buildYear: "",
    address: "",
    city: "",
    stateOrRegion: "",
    zip: "",
    country: "",
    type: "Single Unit",
    beds: 1,
    baths: 1,
    size: "",
    marketRent: "",
    deposit: "",
    parking: "",
    laundry: "",
    ac: "",
    feature: [],
    amenities: [],
    photos: [],
    attachments: [],
  });

  const [files, setFiles] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [previewDoc, setPreviewDoc] = useState([]);
  const [showFeatureInput, setShowFeatureInput] = useState(false);
  const [showAmenityInput, setShowAmenityInput] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [newAmenity, setNewAmenity] = useState('');


  const handleAdd = (type) => {
    if (type === 'feature' && newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        feature: [...prev.feature, newFeature.trim()]
      }));
      setNewFeature('');
      setShowFeatureInput(false);
    } else if (type === 'amenity' && newAmenity.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity('');
      setShowAmenityInput(false);
    }
  };

  const removeItem = (type, index) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImgFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    try {
      const uploadedUrls = await Promise.all(
        files.map(async (file) => {
          const { data } = await axios.post(
            "https://vortexwebpropertymanagement.com/api/files/presigned-url",
            {
              key: file.name,
              contentType: file.type,
            }
          );

          // Upload file to S3 using the pre-signed URL
          await axios.put(data.presignedUrl.presignedUrl, file, {
            headers: { "Content-Type": file.type },
          });

          console.log(data);
          return `https://aghali.s3.ap-south-1.amazonaws.com/${file.name}`;
          // return data.publicUrl; // Store the public URL
        })
      );

      const imageFiles = files.filter((file) => file.type.startsWith("image/"));


      setFormData((prev) => ({
        ...prev,
        ...(imageFiles.length > 0 && { photos: uploadedUrls })
      }));

      const fileUrl = URL.createObjectURL(...imageFiles);
      console.log(fileUrl);
      
      setPreviewImg((prev) => [...prev, fileUrl]);
    } catch (error) {
      console.error("Error uploading files:", error);
    }


    setFiles(files);
  };

  const handleDocFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    try {
      const uploadedUrls = await Promise.all(
        files.map(async (file) => {
          const { data } = await axios.post(
            "https://vortexwebpropertymanagement.com/api/files/presigned-url",
            {
              key: file.name,
              contentType: file.type,
            }
          );

          // Upload file to S3 using the pre-signed URL
          await axios.put(data.presignedUrl.presignedUrl, file, {
            headers: { "Content-Type": file.type },
          });

          console.log(data);
          return `https://aghali.s3.ap-south-1.amazonaws.com/${file.name}`;
          // return data.publicUrl; // Store the public URL
        })
      );

      const nonImageFiles = files.filter(
        (file) => !file.type.startsWith("image/")
      );

      setFormData((prev) => ({
        ...prev,
        ...(nonImageFiles.length > 0 && { attachments: uploadedUrls }),
      }));

      console.log(nonImageFiles);
      const fileUrl = URL.createObjectURL(...nonImageFiles);
      console.log(fileUrl);
      

      setPreviewDoc((prev) => [...prev, fileUrl]);
    } catch (error) {
      console.error("Error uploading files:", error);
    }


    setFiles(files);
  };

  const removeFile = (indexToRemove, isPhoto) => {
    if(isPhoto){
      const photoInput = document.getElementById("photo-upload");
      if (photoInput) {
        photoInput.value = "";
      }
      setPreviewImg(null);
      // const photoFiles = files.filter((file) => file.type.startsWith("image/"));
      // setFiles(files.filter((file) => !file.type.startsWith("image/")));
      setFormData(prev => ({
        ...prev,
        photos: prev.photos.filter((_, i) => i !== indexToRemove)
      }));
    }


    else{
      const input = document.getElementById("file-upload");
      if (input) {
        input.value = "";
      }
      setFiles(files.filter((_, index) => index !== indexToRemove));

      setFormData(prev => ({
        ...prev,
        attachments: prev.attachments.filter((_, i) => i !== indexToRemove)
      }))
      setPreviewDoc(prev => prev.filter((_, i) => i !== indexToRemove))

      // Reset the input value to allow re-uploading the same file
    }
      
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://vortexwebpropertymanagement.com/api/properties",
        formData
      );
      navigate("/properties"); // Redirect after successful submission
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Property</h1>
      <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
        {/* Currency Selection */}


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Currency
            </label>
            <select
              name="currency"
              className="border w-full p-2 rounded"
              onChange={handleChange}
              defaultValue="AED"
              >
              <option value="AED"> د.إ AED</option>
              <option value="$ US Dollar">$ US Dollar</option>
              {/* <option value="₹ Indian Rupee">₹ Indian Rupee</option> */}
            </select>
          </div>
        <div className="flex items-center justify-center">
          <div>
            <label className="group relative inline-flex items-center justify-center gap-2 px-3 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg cursor-pointer transition-colors duration-200 overflow-hidden">
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Upload className="w-5 h-5 animate-bounce group-hover:animate-none" />
            <span>Upload Property Photo</span>
            <input
              type="file"
              name="photos"
              className="w-full border rounded hidden"
              onChange={handleImgFileUpload}
              multiple= {true}
              accept="image/*"
              />
              </label>
           
          </div>
        {previewImg && (
          <div className="relative px-10">
            {previewImg.map((url, index) => (
              <div key={index} className="flex items-center justify-center">

                <img 
                  src={url}
                  alt="Preview" 
                  className="w-36 h-36 object-cover rounded-2xl border-2 border-violet-200 shadow-2xl"
                />
                <button
                  onClick={() => removeFile(index, true)}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    

        {/* General Information */}
        <div>
          <h2 className="text-xl font-bold mb-2">General Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {generalFields.map((field) => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="border p-2 rounded w-full"
                value={formData[field.name]}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>

        {/* Property Type */}
        <div>
          <h2 className="text-xl font-bold mb-2">Property Type</h2>
          <div className="flex gap-4">
            <div className="p-4 border border-black rounded-md flex-1">
              <label className="items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="Single Unit"
                  checked={formData.type === "Single Unit"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Single Unit
              </label>
              <p className="inline-block font-thin pt-4">
                Single family rentals (SFR) are rentals in which there is only
                one rental associated with a specific address. This type of
                property does not allow adding any units/rooms.
              </p>
            </div>

            <div className="p-4 border border-black rounded-md flex-1">
              <label className="items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="Multi Unit"
                  checked={formData.type === "Multi Unit"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Multi Unit
              </label>
              <p className="inline-block font-thin pt-4">
                Multi-unit property are for rentals in which there are multiple
                rental units per a single address.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="block text-gray-700 font-semibold mb-2">
            <span>Beds</span>
            <input
              type="number"
              name="beds"
              placeholder="Beds"
              className="border p-2 rounded w-full"
              value={formData.beds}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Parking
            </label>
            <select
              name="parking"
              className="border w-full p-2 rounded"
              onChange={handleChange}
              defaultValue="Covered"
              >
              <option value="Covered"> Covered</option>
              <option value="Uncovered"> Uncovered</option>
              <option value="None"> None</option>
              {/* <option value="₹ Indian Rupee">₹ Indian Rupee</option> */}
            </select>

          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Laundry
            </label>
            <select
              name="laundry"
              className="border w-full p-2 rounded"
              onChange={handleChange}
              defaultValue="In-Unit"
              >
              <option value="In-Unit"> In-Unit</option>
              <option value="Shared"> Shared</option>
              <option value="None"> None</option>
            </select>


          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              AC Type
            </label>
            <select
              name="ac"
              className="border w-full p-2 rounded"
              onChange={handleChange}
              defaultValue="Central"
              >
              <option value="Central"> Central</option>
              <option value="Window"> Window</option>
              <option value="None"> None</option>

            </select>
          </div>

          <div className="block text-gray-700 font-semibold mb-2">
            <span>Baths</span>
            <input
              type="number"
              name="baths"
              placeholder="Baths"
              className="border p-2 rounded w-full"
              value={formData.baths}
              onChange={handleChange}
            />
          </div>

          <div className="block text-gray-700 font-semibold mb-2">

          <span>Size (sq.ft)</span>
          <input
            type="number"
            name="size"
            placeholder="Size (sq.ft)"
            className="border p-2 rounded w-full"
            value={formData.size}
            
            onChange={handleChange}
            />
            </div>

            <div className="block text-gray-700 font-semibold mb-2">
          <span>Market Rent</span>
          <input
            type="number"
            name="marketRent"
            placeholder="Market Rent"
            className="border p-2 rounded w-full"
            value={formData.marketRent}
            
            onChange={handleChange}
            />
            </div>

            <div className="block text-gray-700 font-semibold mb-2">

          <span>Deposit</span>
          <input
            type="number"
            name="deposit"
            placeholder="Deposit"
            className="border p-2 rounded w-full"
            value={formData.deposit}
            onChange={handleChange}
            
            />
            </div>
        </div>

        {/* Features and Amenities */}

{/* Features */}
        <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Features</h2>
        <div className="space-y-2 flex items-center">
          {formData.feature.map((item, index) => (
            <div key={index} className="flex items-center px-1 py-2 gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md flex items-center gap-2">
                {item}
                <button
                  onClick={() => removeItem('feature', index)}
                  className="hover:text-blue-600"
                >
                  <X size={16} />
                </button>
              </span>
            </div>
          ))}
          
        </div>
          {showFeatureInput ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className="flex-1 border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter feature"
                onKeyPress={(e) => e.key === 'Enter' && handleAdd('feature')}
              />
              <button
                onClick={() => handleAdd('feature')}
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowFeatureInput(true)}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              <PlusCircle size={16} />
              Add Feature
            </button>
          )}
      </div>

{/* Amenities */}
      <div>
        <h2 className="text-xl font-bold mb-2">Amenities</h2>
        <div className="space-y-2 flex">
          {formData.amenities.map((item, index) => (
            <div key={index} className="flex px-1 py-2 items-center gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-md flex items-center gap-2">
                {item}
                <button
                  onClick={() => removeItem('amenities', index)}
                  className="hover:text-green-600"
                >
                  <X size={16} />
                </button>
              </span>
            </div>
          ))}
          
        </div>
          {showAmenityInput ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                className="flex-1 border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter amenity"
                onKeyPress={(e) => e.key === 'Enter' && handleAdd('amenity')}
              />
              <button
                onClick={() => handleAdd('amenity')}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Add
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAmenityInput(true)}
              className="flex items-center gap-2 px-4 py-2 text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition-colors"
            >
              <PlusCircle size={16} />
              Add Amenity
            </button>
          )}
      </div>
    </div>
        {/* <div>
          <h2 className="text-xl font-bold mb-2">Features</h2>
          <textarea
            name="feature"
            placeholder="Enter features separated by commas"
            className="w-full border p-2 rounded"
            value={formData.feature.join(", ")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                feature: e.target.value.split(",").map((f) => f.trim()),
              }))
            }
          />
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Amenities</h2>
          <textarea
            name="amenities"
            placeholder="Enter amenities separated by commas"
            className="w-full border p-2 rounded"
            value={formData.amenities.join(", ")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                amenities: e.target.value.split(",").map((a) => a.trim()),
              }))
            }
          />
        </div> */}

        <h2 className="text-xl font-bold mb-2">Upload Attachment</h2>
        <div className="border border-dashed rounded-lg border-gray-700 h-36 flex justify-center items-center ">
          <div className="flex gap-4 items-center overflow-y-auto">
            {/* Hidden File Input */}
            <input
              id="file-upload"
              type="file"
              name="attachments"
              multiple
              className="hidden"
              onChange={handleDocFileUpload}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.odt,.html,.htm,.xml,.json,.csv,.tsv,.epub,.djvu,.ps,.eps,.tex,.latex,.blend,.ai,.psd,.indd,.zip,.rar,.7z"
            />
            {/* Label as Stylized Button */}
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center cursor-pointer text-green-600 hover:text-green-500"
            >
              <div className="flex justify-center items-center w-16 h-16 bg-green-100 border-2 border-green-600 rounded-full">
                <span className="text-3xl font-bold">+</span>
              </div>
              <span className="mt-2 text-lg font-medium">Upload</span>
              <span className="font-thin">Store Documents and Templates</span>
            </label>


            {
            files.filter((file) => !file.type.startsWith("image/")).length > 0 && (
              <div className="mt-4 w-full max-w-md">
                <h3 className="text-lg font-medium mb-2">Uploaded Files:</h3>
                <ul className="space-y-2">
                  {files.filter((file) => !file.type.startsWith("image/")).map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg group"
                    >
                      <span className="text-sm text-gray-600">{file.name}</span>
                      <button
                        onClick={() => removeFile(index, false)}
                        className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-200 transition-colors"
                        aria-label={`Remove ${file.name}`}
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full mt-4"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
