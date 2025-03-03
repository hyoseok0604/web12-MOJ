import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../../components/common/Button';
import { css } from '@emotion/react';
import Editor from '@monaco-editor/react';
import StatusList from '../../components/status/StatusList';
import style from '../../styles/style';
import axiosInstance from '../../axios';
import axios from 'axios';
import Head from 'next/head';

function StatusDetail() {
  const router = useRouter();
  const [status, setStatus] = useState<StatusSummary | null>(null);
  const [id, setId] = useState<number>();
  const [submission, setSubmission] = useState<SubmissionResopnseData | null>(
    null,
  );

  useEffect(() => {
    if (!id) return;

    let timer: NodeJS.Timeout | undefined = undefined;

    const fetchSubmission = async () => {
      try {
        const res = await (
          await axiosInstance.get<SubmissionResopnseData>(
            `/api/submissions/${id}`,
          )
        ).data;
        setSubmission(res);

        if (res.submission.state === null) {
          timer = setTimeout(() => {
            fetchSubmission();
          }, 1000);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          alert(err.response?.data.message);
          router.back();
        }
      }
    };

    fetchSubmission();

    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    if (!submission) return;

    setStatus({
      id: submission.submission.id,
      user: submission.submission.user,
      title: submission.problem.title,
      state: submission.submission.state ?? '',
      time: submission.submission.time,
      datetime: submission.submission.datetime,
    });
  }, [submission]);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (typeof id === 'string') setId(+id);
    }
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>MOJ | 풀이 상세</title>
      </Head>
      <div css={style.container}>
        <div css={style.title}>풀이 상세</div>
        {!submission || !status ? (
          <div>로딩중</div>
        ) : (
          <>
            <StatusList status={status} />
            <div css={style.codeBox}>
              <Editor
                defaultLanguage={submission.submission.language}
                defaultValue={submission.submission.code}
                options={{
                  readOnly: true,
                  minimap: {
                    enabled: false,
                  },
                  scrollbar: {
                    vertical: 'hidden',
                    verticalScrollbarSize: 0,
                  },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </>
        )}
        <div css={style.footer}>
          <Button>복사</Button>
        </div>
      </div>
    </>
  );
}

export default StatusDetail;
