import { Helmet } from 'react-helmet-async';

export default function Meta({ title, description, keywords }) {
    return (
        <Helmet className=''>
            <title>{title}</title>
            <meta
                name='description'
                content={description}
            />
            <meta
                name='keywords'
                content={keywords}
            />
        </Helmet>
    );
}

Meta.defaultGlow = {
    title: 'Welcome to Glow Jewelry Shop',
    description:
        'Explore classic and modern jewelry at Glow Jewelry. Find the perfect gift with our range of diamond engagement rings, 18K gold jewellery, earrings, and bracelets.',
    keywords: 'diamond, 18K, gold, jewelry, rings, earrings, bracelets, necklaces',
};
