import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Footer from '../../../../components/Footer';
import Header from '../../../../components/Header';
import { Contributors, RepoData, RepoDetail } from '../../../../utils/types';
import Star from '../../../../public/icon/Star.svg';
import Fork from '../../../../public/icon/Fork.svg';
import Watch from '../../../../public/icon/Watch.svg';
import Link from 'next/link';
import Head from 'next/head';
import Favicon from '../../../../utils/Favicon';
import styles from '../../../../styles/[reponame].module.sass';

interface Props {
  detail: RepoDetail;
  languages: Object;
  contributors: Array<Contributors>;
}

export default function Repo(props: Props) {
  const router = useRouter();
  const reponame = router.query.reponame as string;

  const detail = props.detail!;
  const cntrbtrs = props.contributors!;
  //console.log(props.languages);
  const lans = Object.entries(props.languages!);
  let percntnew: number = 0;

  let totalByte: number = 0;

  Object.values(props.languages).forEach((element) => {
    totalByte += element;
  });

  let roundDecimal = function (val: number, precision: number) {
    return (
      Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) /
      Math.pow(10, precision || 0)
    );
  };

  //console.log(totalByte);

  return (
    <div className="bg-[#030D22] ">
      <Head>
        <title>{detail.full_name}</title>
        <meta
          name="description"
          content={`${reponame} is a public repository created by ${detail.owner.login} on Github.`}
        />
        <meta property="og:image" content="../public/Landing.png" />
        <Favicon />
      </Head>
      <div>
        <Header />
      </div>
      <div className={styles.cntanr}>
        <div className="flex flex-col justify-center items-start w-full">
          <div className="text-center text-2xl text-white">
            <Link
              href={{
                pathname: '/users/[username]/repos/',
                query: { username: detail.owner.login },
              }}
            >
              <a className="hover:underline">{detail.owner.login}</a>
            </Link>
            <span className="text-[#c4c4c4]">{' / '}</span>
            <a href={detail.html_url} className="font-medium hover:underline">
              {detail.name}
            </a>
          </div>
          <div className="border-b border-[#C4C4C4] mt-2 w-full" />
        </div>
        <div className="flex justify-center items-center w-[90%]">
          <div className={styles.repodetail}>
            <div className={styles.detailitem}>
              <p className={styles.itemtitle}>Last Update</p>
              <p className="my-3 text-[#c4c4c4]">
                {detail.updated_at.slice(0, 10)}
              </p>
            </div>
            <div className={styles.detailitem}>
              <p className={styles.itemtitle}>About</p>
              <p className="my-3 text-[#c4c4c4]">{detail.description}</p>
            </div>
            <div className={styles.detailitem}>
              <p className={styles.itemtitle}>Stats</p>
              <div className={styles.detailstats}>
                <div className="flex flex-row justify-center items-center mr-3">
                  <Image src={Star} alt="star" width={14} height={13} />
                  <p className="pl-1">{detail.stargazers_count} stars</p>
                </div>
                <div className="flex flex-row justify-center items-center mr-3">
                  <Image src={Watch} alt="star" width={13} height={10} />
                  <p className="pl-1">{detail.watchers_count} watching</p>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <Image src={Fork} alt="star" width={13} height={13.6} />
                  <p className="pl-1">{detail.forks_count} forks</p>
                </div>
              </div>
            </div>
            <div className={styles.detailitem}>
              <p className={styles.itemtitle}>License</p>
              <p className="my-3 text-[#c4c4c4]">
                {detail.license === null
                  ? 'No license information'
                  : detail.license.name}
              </p>
            </div>
            <div className={styles.detailitem}>
              <p className={styles.itemtitle}>Languages</p>
              <div className="w-[95%] relative my-3">
                {lans.map((lan, index) => {
                  console.log(lans.length);
                  let newLan = lan[0].replace(' ', '-');
                  newLan = newLan.replace('#', '-Sharp');
                  newLan = newLan.replace('++', 'pp');

                  let percnt = roundDecimal((lan[1] / totalByte) * 100, 3);
                  let rounded: string = 'rounded-tl-full rounded-bl-full';
                  percntnew += percnt;
                  // if (index === 0) {
                  //   percntnew = percnt;
                  // } else {
                  //   percnt += percnt;
                  // }
                  if (index === lans.length - 1) {
                    rounded = 'rounded-full';
                  }
                  return (
                    <div
                      key={lan[0]}
                      className={`h-2 ${rounded} mr-1 ${newLan} absolute top-0 left-0 `}
                      style={{
                        width: `${percntnew}%`,
                        zIndex: `${100 - index}`,
                      }}
                    ></div>
                  );
                })}
              </div>

              <div className={styles.detailstats}>
                {lans.map((lan) => {
                  let newLan = lan[0].replace(' ', '-');
                  newLan = newLan.replace('#', '-Sharp');
                  newLan = newLan.replace('++', 'pp');
                  return (
                    <div
                      key={lan[0]}
                      className="flex flex-row justify-center items-center mr-3"
                    >
                      <div
                        className={`w-4 h-4 rounded-full mr-1 ${newLan}`}
                      ></div>
                      <p>{lan[0]}</p>
                      <p className="pl-1 text-[#8C949E]">
                        {roundDecimal((lan[1] / totalByte) * 100, 3)}%
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.detailitem}>
              <p className={styles.itemtitle}>Contributors</p>
              <div className="flex flex-row flex-wrap justify-start items-center my-3 ">
                {cntrbtrs !== null
                  ? cntrbtrs.map((contributor: Contributors) => {
                      if (contributor !== null) {
                        return (
                          <div className="mr-[2px]">
                            <Image
                              key={contributor.id}
                              src={contributor.avatar_url}
                              alt="contributor-avatar"
                              width={30}
                              height={30}
                              className="rounded-full"
                            />
                          </div>
                        );
                      }
                    })
                  : 'No contributor information'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params!;
  const reponame = params.reponame;
  const username = params.username;

  //console.log('username =' + username);
  //console.log('reponame = ' + reponame);

  const res = await fetch(
    `https://api.github.com/repos/${username}/${reponame}`
  );
  const data = await res.json();
  //console.log(data);

  const res2 = await fetch(
    `https://api.github.com/repos/${username}/${reponame}/languages`
  );
  const lan = await res2.json();

  const res3 = await fetch(
    `https://api.github.com/repos/${username}/${reponame}/contributors`
  );
  if (res3.status === 204) {
    var Data3: Array<Contributors> = [];
  } else {
    var Data3: Array<Contributors> = await res3.json();
  }
  const contributor = Data3;

  return {
    props: {
      detail: data as RepoDetail,
      languages: lan as Object,
      contributors: contributor as Array<Contributors>,
    },
  };
};
