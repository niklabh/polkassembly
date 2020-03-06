// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React from 'react';

import { useLatestDiscussionPostsQuery } from '../../generated/graphql';
import DiscussionsListing from '../../components/Listings/DiscussionsListing';
import FilteredError from '../../ui-components/FilteredError';
import Loader from '../../ui-components/Loader';

const DiscussionsContainer = () => {

	const { data, error } = useLatestDiscussionPostsQuery({ variables: { limit: 20 } });

	if (error) {
		return <FilteredError text={error.message}/>;
	}

	if (data) return <DiscussionsListing data={data} />;

	return <Loader/>;

};

export default DiscussionsContainer;