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
                query: ({domain, page}) => {
                    const params = domain === '//' ? {
                        limit: 20,
                        offset: page === 1 ? 0 : ((page * 20) - 20)
                    } : {
                        domain: domain,
                        limit: 20,
                        offset: page === 1 ? 0 : ((page * 20) - 20)
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
                query: ({domain, page, date}) => {
                    const params = date ? {
                        site: domain,
                        limit: 20,
                        offset: page === 1 ? 0 : ((page * 20) - 20),
                        date: date
                    } : (domain !== '//' ? {
                        site: domain,
                        limit: 20,
                        offset: page === 1 ? 0 : ((page * 20) - 20),
                    } : {
                        limit: 20,
                        offset: page === 1 ? 0 : ((page * 20) - 20),
                    })
                    return {
                        url: `api/site/publisher/reports`,
                        method: 'GET',
                        params: params
                    }
                },
                // providesTags: ['pWebsiteTable']
            }),
            getAReportsTable: build.query({
                query: ({domain, page, date}) => {
                    const params = date ? {
                        campaignName: domain,
                        limit: 20,
                        offset: page === 1 ? 0 : ((page * 20) - 20),
                        date: date
                    } : (domain !== '//' ? {
                        campaignName: domain,
                        limit: 20,
                        offset: page === 1 ? 0 : ((page * 20) - 20),
                    } : {
                        limit: 20,
                        offset: page === 1 ? 0 : ((page * 20) - 20),
                    })
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
                query: ({page, status}) => {
                    const params = (status && status !== 'all') ? {
                        status: status,
                        limit: 20,
                        offset: page === 1 ? 0 : ((page * 20) - 20),
                    } : {
                        limit: 20,
                        offset: page === 1 ? 0 : ((page * 20) - 20),
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
                query: ({page = 1, type, status, date}) => {
                    const params = {
                        type: type,
                        limit: 20,
                        offset: page === 1 ? 0 : ((page * 20) - 20),
                        status: status,
                        date: date,
                    }
                    if (!type) {
                        delete params.type
                    }
                    if (!status) {
                        delete params.status
                    }
                    if (!date) {
                        delete params.date
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
