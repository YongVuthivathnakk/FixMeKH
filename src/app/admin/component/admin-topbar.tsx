export const AdminTopBar = () => {
    return (
        <div className="flex items-center justify-between h-16 px-4 bg-gray-100 border-b">
            <div className="flex items-center space-x-4">
                <h1 className="text-lg font-semibold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
                {/* Add user profile or logout button here */}
            </div>
        </div>
    );
}