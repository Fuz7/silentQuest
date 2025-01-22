import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.jsx',
        './resources/**/*.js',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                'Poppins-Regular':['Poppins-Regular'],
                'Poppins-Medium':['Poppins-Medium'],
                'Poppins-SemiBold':['Poppins-SemiBold'],
                'Poppins-Bold':['Poppins-Bold'],
            },
            backgroundImage:{
                loginGradient:"linear-gradient(180deg, rgba(46,80,119,1) 0%, rgba(25,42,60,1) 100%)",
                homeGradient:'linear-gradient(90deg, #F6F4F0 0%, #DADADA 100%)',
            }
        },

    },
    plugins: [],
};
