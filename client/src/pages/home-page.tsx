import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <h1 className="text-3xl font-bold mb-4">Welcome {user?.username}!</h1>
          <p className="text-gray-600">
            This is your personal dashboard. Here you can manage your account and access various features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Profile</h2>
              <p className="text-gray-600">View and edit your profile information</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Settings</h2>
              <p className="text-gray-600">Manage your account settings and preferences</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Help</h2>
              <p className="text-gray-600">Get help and support when you need it</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}