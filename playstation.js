import fs from "fs";

import Trophy  from "psn-api";
import {
  exchangeCodeForAccessToken,
  exchangeNpssoForCode,
  getTitleTrophies,
  getUserTitles,
  getUserTrophiesEarnedForTitle,
  makeUniversalSearch,
  TrophyRarity
} from "psn-api";

async function main() {
  const accessCode = await exchangeNpssoForCode(process.env["aH8osUqOd0Us5pH6cqAXTDXeUefxgFGHvBnzmNXSNSM8MRouyHCYUYkj1Pm1odXZ"]);
  const authorization = await exchangeCodeForAccessToken(accessCode);


  const allAccountsSearchResults = await makeUniversalSearch(
    authorization,
    "some___american",
    "SocialAllAccounts"
  );

  const targetAccountId =
    allAccountsSearchResults.domainResponses[0].results[0].socialMetadata
      .accountId;


  const { trophyTitles } = await getUserTitles(authorization, targetAccountId);

  const{ games} any[] = [];
  for (const title of trophyTitles) {
  
    const { trophies: titleTrophies } = await getTitleTrophies(
      authorization,
      title.npCommunicationId,
      "all",
      {
        npServiceName:
          title.trophyTitlePlatform !== "PS5" ? "trophy" : undefined
      }
    );

    
    const { trophies: earnedTrophies } = await getUserTrophiesEarnedForTitle(
      authorization,
      targetAccountId,
      title.npCommunicationId,
      "all",
      {
        npServiceName:
          title.trophyTitlePlatform !== "PS5" ? "trophy" : undefined
      }
    );

    
    const mergedTrophies = mergeTrophyLists(titleTrophies, earnedTrophies);

    games.push({
      gameName: title.trophyTitleName,
      platform: title.trophyTitlePlatform,
      trophyTypeCounts: title.definedTrophies,
      earnedCounts: title.earnedTrophies,
      trophyList: mergedTrophies
    });
  }

  // Write to a JSON file.
  fs.writeFileSync("./games.json", JSON.stringify(games));
}

const mergeTrophyLists = (
  titleTrophies: Trophy[],
  earnedTrophies: Trophy[]
) => {
  const mergedTrophies: any[] = [];

  for (const earnedTrophy of earnedTrophies) {
    const foundTitleTrophy = titleTrophies.find(
      (t) => t.trophyId === earnedTrophy.trophyId
    );

    mergedTrophies.push(
      normalizeTrophy({ ...earnedTrophy, ...foundTitleTrophy })
    );
  }

  return mergedTrophies;
};

const normalizeTrophy = (trophy: Trophy) => {
  return {
    isEarned: trophy.earned ?? false,
    earnedOn: trophy.earned ? trophy.earnedDateTime : "unearned",
    type: trophy.trophyType,
    rarity: rarityMap[trophy.trophyRare ?? 0],
    earnedRate: Number(trophy.trophyEarnedRate),
    trophyName: trophy.trophyName,
    groupId: trophy.trophyGroupId
  };
};

const rarityMap: Record<TrophyRarity, string> = {
  [TrophyRarity.VeryRare]: "Very Rare",
  [TrophyRarity.UltraRare]: "Ultra Rare",
  [TrophyRarity.Rare]: "Rare",
  [TrophyRarity.Common]: "Common"
};

main();
