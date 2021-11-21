const fleetPostFields = [
    {
        label: 'title',
        type: 'text',
    },
    {
        label: 'thumbnail',
        type: 'file',
    },
    {
        label: 'modelName',
        type: 'text',
    },
    {
        label: 'personalBestSpeed',
        type: 'decimal',
    },
    {
        label: 'tires',
        type: 'text',
    },
    {
        label: 'receiver',
        type: 'text',
    },
    {
        label: 'pinionGearSize',
        type: 'number',
    },
    {
        label: 'spurGearSize',
        type: 'number',
    },
    {
        label: 'avgMotorTemp',
        type: 'decimal',
    },
    {
        label: 'avgEscTemp',
        type: 'decimal',
    },
    {
        label: 'lipoCell',
        type: 'number',
    },
    {
        label: 'shockOilViscosityFront',
        type: 'number',
    },
    {
        label: 'shockOilViscosityRear',
        type: 'number',
    },
    {
        label: 'diffOilViscosityFront',
        type: 'number',
    },
    {
        label: 'diffOilViscosityCenter',
        type: 'number',
    },
    {
        label: 'diffOilViscosityRear',
        type: 'number',
    },
    {
        label: 'featured',
        type: 'checkbox',
    },
];

const formatFieldLabel = (label) => (label.replace(/([A-Z])/g, ' $1').trim().toUpperCase());

const formatFieldValue = (label, value) => {
    // TODO: create util file to dynamically switch through database fields in one location
    switch (label) {
    case 'personalBestSpeed':
        return `${value} mph`;
    case 'pinionGearSize':
    case 'spurGearSize':
        return `${value}T`;
    case 'avgMotorTemp':
    case 'avgEscTemp':
        return `${value}\u00B0F`;
    case 'lipoCell':
        return `${value}S`;
    case 'shockOilViscosityFront':
    case 'shockOilViscosityRear':
    case 'diffOilViscosityFront':
    case 'diffOilViscosityCenter':
    case 'diffOilViscosityRear':
        return `${value}cSt`;
    default:
        return value;
    }
};

export {
    fleetPostFields,
    formatFieldLabel,
    formatFieldValue,
};
