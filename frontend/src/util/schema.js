import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

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
        info: true,
    },
    {
        label: 'personalBestSpeed',
        type: 'decimal',
        info: true,
    },
    {
        label: 'tires',
        type: 'text',
        info: true,
    },
    {
        label: 'receiver',
        type: 'text',
        info: true,
    },
    {
        label: 'pinionGearSize',
        type: 'number',
        info: true,
    },
    {
        label: 'spurGearSize',
        type: 'number',
        info: true,
    },
    {
        label: 'avgMotorTemp',
        type: 'decimal',
        info: true,
    },
    {
        label: 'avgEscTemp',
        type: 'decimal',
        info: true,
    },
    {
        label: 'lipoCell',
        type: 'number',
        info: true,
    },
    {
        label: 'shockOilViscosityFront',
        type: 'number',
        info: true,
    },
    {
        label: 'shockOilViscosityRear',
        type: 'number',
        info: true,
    },
    {
        label: 'diffOilViscosityFront',
        type: 'number',
        info: true,
    },
    {
        label: 'diffOilViscosityCenter',
        type: 'number',
        info: true,
    },
    {
        label: 'diffOilViscosityRear',
        type: 'number',
        info: true,
    },
    {
        label: 'featured',
        type: 'checkbox',
    },
];

const formatFieldLabel = (label) => (label.replace(/([A-Z])/g, ' $1').trim().toUpperCase());

const formatFieldLabelUnit = (label) => {
    switch (label) {
    case 'personalBestSpeed':
        return '(mph)';
    case 'pinionGearSize':
    case 'spurGearSize':
        return '(T)';
    case 'avgMotorTemp':
    case 'avgEscTemp':
        return '(\u00B0F)';
    case 'lipoCell':
        return '(S)';
    case 'shockOilViscosityFront':
    case 'shockOilViscosityRear':
    case 'diffOilViscosityFront':
    case 'diffOilViscosityCenter':
    case 'diffOilViscosityRear':
        return '(cSt)';
    default:
        return '';
    }
};

const formatFieldValue = (label, value) => {
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

const formatTimeAgo = (datetime) => timeAgo.format(new Date(datetime)).toUpperCase();

const profileFields = [
    {
        label: 'handle',
        type: 'text',
    },
    {
        label: 'bio',
        type: 'textarea',
    },
];

export {
    fleetPostFields,
    formatFieldLabel,
    formatFieldLabelUnit,
    formatFieldValue,
    formatTimeAgo,
    profileFields,
};
