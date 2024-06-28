import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const globalApi = createApi({
        reducerPath: 'globalApi',
        baseQuery: fetchBaseQuery(
            {baseUrl: 'http://clickinder.com/'}),
        tagTypes: ['globalApi', 'pWebsiteTable', 'campaigns', 'payments'],
        endpoints: (build) => ({

            getProfile: build.mutation({
                query: () => ({
                    url: `api/site/user`,
                    method: 'GET',
                }),
            }),

            getPWebsiteTable: build.query({
                query: ({domain, page, sort}) => {
                    const params = domain === '//' ? {
                        limit: page?.size,
                        offset: page?.page === 1 ? 0 : ((page?.page * page?.size) - page?.size),
                        sort: sort
                    } : {
                        domain: domain,
                        limit: page?.size,
                        offset: page?.page === 1 ? 0 : ((page?.page * page?.size) - page?.size),
                        sort: sort
                    }

                    if (domain === '//') {
                        delete params.domain
                    }
                    if (!sort) {
                        delete params.sort
                    }

                    return {
                        url: `api/site/publisher/sites`,
                        method: 'GET',
                        params: params
                    }
                },
                providesTags: ['pWebsiteTable']
            }),
            getPReportsTable: build.query({
                query: ({domain, page, date, sort}) => {
                    const params = date ? {
                        site: domain,
                        limit: page?.size,
                        offset: page?.page === 1 ? 0 : ((page?.page * page?.size) - page?.size),
                        date: date,
                        sort: sort
                    } : (domain !== '//' ? {
                        site: domain,
                        limit: page?.size,
                        offset: page?.page === 1 ? 0 : ((page?.page * page?.size) - page?.size),
                        sort: sort
                    } : {
                        limit: page?.size,
                        offset: page?.page === 1 ? 0 : ((page?.page * page?.size) - page?.size),
                        sort: sort
                    })

                    if (domain === '//') {
                        delete params.site
                    }
                    if (!sort) {
                        delete params.sort
                    }

                    return {
                        url: `api/site/publisher/reports`,
                        method: 'GET',
                        params: params
                    }
                },
                // providesTags: ['pWebsiteTable']
            }),
            getAReportsTable: build.query({
                query: ({domain, page, date, sort}) => {
                    const params = date ? {
                        campaignName: domain,
                        limit: page?.size,
                        offset: page?.page === 1 ? 0 : ((page?.page * page?.size) - page?.size),
                        date: date,
                        sort: sort
                    } : (domain !== '//' ? {
                        campaignName: domain,
                        limit: page?.size,
                        offset: page?.page === 1 ? 0 : ((page?.page * page?.size) - page?.size),
                        sort: sort
                    } : {
                        limit: page?.size,
                        offset: page?.page === 1 ? 0 : ((page?.page * page?.size) - page?.size),
                        sort: sort
                    })

                    if (domain === '//') {
                        delete params.campaignName
                    }

                    if (!sort) {
                        delete params.sort
                    }

                    return {
                        url: `api/site/advertiser/reports`,
                        method: 'GET',
                        params: params
                    }
                },
                // providesTags: ['pWebsiteTable']
            }),
            addedPWebsite: build.mutation({
                query: (domain) => ({
                    url: `api/site/publisher/sites`,
                    method: 'POST',
                    body: {domain: domain}
                }),
                invalidatesTags: (res, error, erg) => error ? [] : ['pWebsiteTable']
            }),
            removePWebsite: build.mutation({
                query: (id) => ({
                    url: `api/site/publisher/sites/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: (res, error, erg) => error ? [] : ['pWebsiteTable']
            }),

            getCampaignsTable: build.query({
                query: ({page, status, sort}) => {
                    const params = (status && status !== 'all') ? {
                        status: status,
                        limit: page?.size,
                        offset: page?.page === 1 ? 0 : ((page?.page * page?.size) - page?.size),
                        sort: sort
                    } : {
                        limit: page?.size,
                        offset: page?.page === 1 ? 0 : ((page?.page * page?.size) - page?.size),
                        sort: sort
                    }

                    if (!sort) {
                        delete params.sort
                    }

                    return {
                        url: `api/site/campaigns`,
                        method: 'GET',
                        params: params
                    }
                },
                providesTags: ['campaigns']
            }),
            addedCampaign: build.mutation({
                query: (payload) => ({
                    url: `api/site/campaigns`,
                    method: 'POST',
                    body: payload
                }),
                invalidatesTags: (res, error, erg) => error ? [] : ['campaigns']
            }),
            editCampaign: build.mutation({
                query: ({data, id}) => ({
                    url: `api/site/campaigns/${id}`,
                    method: 'PUT',
                    body: data
                }),
                invalidatesTags: (res, error, erg) => error ? [] : ['campaigns']
            }),
            deleteCampaign: build.mutation({
                query: (id) => ({
                    url: `api/site/campaigns/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: (res, error, erg) => error ? [] : ['campaigns']
            }),
            startStopCampaign: build.mutation({
                query: ({type, id}) => ({
                    url: `api/site/campaign/${type}/${id}`,
                    // body: {
                    //     campaignId: id
                    // },
                    method: 'PUT',
                }),
                invalidatesTags: (res, error, erg) => error ? [] : ['campaigns']
            }),
            getTablePayments: build.query({
                query: ({page = 1, type, status, date, sort}) => {
                    const params = {
                        type: type,
                        limit: page?.size,
                        offset: page?.page === 1 ? 0 : ((page?.page * page?.size) - page?.size),
                        status: status,
                        created: date,
                        sort: sort
                    }
                    if (!type) {
                        delete params.type
                    }
                    if (!status) {
                        delete params.status
                    }
                    if (!date) {
                        delete params.created
                    }

                    if (!sort) {
                        delete params.sort
                    }
                    return {
                        url: `api/site/payments`,
                        method: 'GET',
                        params: params
                    }
                },
                providesTags: ['payments']
            }),
            setDeposit: build.mutation({
                query: (payload) => {
                    return {
                        url: `api/site/payments`,
                        method: 'POST',
                        body: payload
                    }
                },
                invalidatesTags: (res, error, erg) => error ? [] : ['payments']
            }),
        }),
    }
)

export const {
    useGetProfileMutation,
    useSetDepositMutation,
    useGetTablePaymentsQuery,
    useStartStopCampaignMutation,
    useEditCampaignMutation,
    useAddedCampaignMutation,
    useRemovePWebsiteMutation,
    useAddedPWebsiteMutation,
    useGetPWebsiteTableQuery,
    useGetPReportsTableQuery,
    useGetAReportsTableQuery,
    useGetCampaignsTableQuery,
    useDeleteCampaignMutation,
} = globalApi;
