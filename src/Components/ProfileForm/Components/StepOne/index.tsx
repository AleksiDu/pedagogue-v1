import { SetStateAction, useState } from "react";
import Input from "../../../RegistrationLoginCom/RegisterForm/Components/Input";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

/**
 * Todo
 * Algolia Places API
 */

const StepOne = () => {
  const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [location, setLocation] = useState<{ lat: number; lng: number }>();

  const [info1, setInfo1] = useState({ name: "" });
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");

  const [gender, setGender] = useState("");

  const handleAddressSelect = async (address: string) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);

      const formattedAddress = results[0].formatted_address;
      setSelectedAddress(formattedAddress);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleAddressChange = (address: string) => {
    setSelectedAddress(address);
  };

  const handleGenderChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setGender(e.target.value);
    console.log(e.target.value);
  };

  const onInputChanged = (event: { target: { name: any; value: any } }) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    setInfo1((info1) => ({
      ...info1,
      [targetName]: targetValue,
    }));
  };

  const validate = () => {
    if (!info1?.name) setError("Name is mandatory field");
    else {
      setError("");
      // props.nextStep();
      // props.userCallback(info1);
    }
  };

  return (
    <div>
      <span style={{ color: "red" }}>{error}</span>
      <h1>This is step 1 content</h1>

      <Input
        name="First Name:"
        type="text"
        onChange={onInputChanged}
        value={firstName}
        required
      />
      <Input
        name="Last Name:"
        type="text"
        onChange={onInputChanged}
        value={firstName}
        required
      />
      <Input
        name="Birth Date:"
        type="date"
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setFirstName(e.target.value)
        }
        value={firstName}
        required
      />
      <Input
        name="Gender"
        type="radio"
        checked={gender === "male"}
        onChange={handleGenderChange}
        value="male"
      />
      <Input
        name="Gender"
        type="radio"
        checked={gender === "female"}
        onChange={handleGenderChange}
        value="female"
      />
      <h1>Address:</h1>
      <PlacesAutocomplete
        value={selectedAddress}
        onChange={handleAddressChange}
        onSelect={handleAddressSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: "Enter an address" })} />
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, { style })}
                    key={suggestion.placeId}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <p>Latitude: {location?.lat}</p>
      <p>Longitude: {location?.lng}</p>
      <Input
        name="City:"
        type="text"
        onChange={onInputChanged}
        value={firstName}
        required
      />
      <Input
        name="Street:"
        type="text"
        onChange={onInputChanged}
        value={firstName}
        required
      />
    </div>
  );
};

export default StepOne;
