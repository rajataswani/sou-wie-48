
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const StorageInfo = () => {
  return (
    <Alert className="bg-blue-50 border-blue-200 mb-6">
      <InfoIcon className="h-5 w-5 text-blue-600" />
      <AlertTitle className="text-blue-800">About Data Storage</AlertTitle>
      <AlertDescription className="text-blue-700">
        Currently, all events and awards are stored in your browser's local storage.
        This means the data will persist on this device but won't be shared across devices.
        <br />
        <br />
        For a production deployment, you might want to consider:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>A database service like Firebase or Supabase</li>
          <li>A content management system like Sanity or Contentful</li>
          <li>A simple JSON file hosted on your server</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default StorageInfo;
