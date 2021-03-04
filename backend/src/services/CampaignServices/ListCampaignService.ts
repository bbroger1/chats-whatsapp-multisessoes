import { Sequelize } from "sequelize-typescript";
import Campaign from "../../models/Campaign";
import CampaignContacts from "../../models/CampaignContacts";

interface Request {
  tenantId: string | number;
  isActive?: string | boolean | null;
}

const ListCampaignService = async ({
  tenantId
}: Request): Promise<Campaign[]> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    tenantId
  };

  const campaignData = await Campaign.findAll({
    where,
    attributes: {
      include: [
        [
          Sequelize.fn("COUNT", Sequelize.col("campaignContacts.id")),
          "contactsCount"
        ]
      ]
    },
    include: [
      {
        model: CampaignContacts,
        attributes: []
      }
    ],
    group: ["Campaign.id"],
    order: [["start", "ASC"]]
  });

  return campaignData;
};

export default ListCampaignService;
