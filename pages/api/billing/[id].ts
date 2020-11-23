import getStripeCustomerPortal from "../../../utils/get-stripe-customer-portal";

export default async function billing(req, res) {
  const {
    query: {id},
  } = req
  await getStripeCustomerPortal(id).then((portalLink) => {
    res.redirect(200, portalLink)
  }).catch((error)=> {
    res.status(400).json({ message: `Error: ${error}` })
  })
}