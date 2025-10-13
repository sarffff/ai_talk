const RoleCard = ({ name, description }) => {
    return (
        <div className="bg-white shadow rounded p-4 flex items-start space-x-4">
            <div>
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    );
};

export default RoleCard;
