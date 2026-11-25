## `tail` command
`tail <TARGET>`: テキストファイルの最後方を表示するコマンドで、デフォルトではファイルの後ろ10行分表示します。`tail`の逆の動作をするコマンドとして、`head`コマンドもあります。
- `tail -f`: 対象ファイルが更新される度に、新たに追加された最下行の内容を表示し続けます。「ctrl」 + 「c」で終了するまで表示され続けます。ログ監視の際によく使用されます。
- `tail`コマンドの後ろに`| grep <対象ワード>`を追加すると、対象ワードと一致した単語が存在している行のみ表示します。例えば：`tail /var/log/messages | grep err`とすると、「err」という単語がある行のみ表示します。
`/var/log/messages`ファイル内からエラー内容を調べる時に、「error」というワードが「err」と短縮されている場合もあるため、こういった指定をしています。
なお、単語になっているワードのみを抜き出してくれるわけではないので、上記コマンドの場合「err」というワードを含んだ単語も引っかかってしまいますので、誤検知する事もあります。
- `-n`オプションを追加すると、表示する行数を指定できます。指定する際の書式は、`-n <数値>`です。
- `-c` オプションで行数ではなく、指定したバイト数を末尾から表示します。
  
## `curl` command
`curl <-option> <URL>`: (`curl` = client for URL) 様々な通信プロトコルでデータの送受信を行うことができるコマンドです。
- `curl https://example.com`: データを取得する（GET）
- `curl -o output.html https://example.com`: レスポンスをファイルに保存する(`-o filename`: 指定したファイル名で保存)
- `curl --request GET \
  --url https://openrouter.ai/api/v1/key \
  --header "Authorization: Bearer <API KEY>"`: openrouterのAPIキーの使用状況を調べる

## `readlink` command
`readlink <PATH>`: show the destination path of a symbolic link

## Download from Huggingface
例：`hf download Qwen/Qwen3-VL-4B-Instruct --local-dir <LOCAL TARGET DIRECTORY>`: `Qwen3-VL-4B-Instruct`モデルを指定されたローカルディレクトリにダウンロード


# Commands for Miyabi System
- `qstat`: 自分の(未完成)ジョブ一覧
- `qstat -a`: 他人のジョブも含め、システム上未完成ジョブ全ての詳細な一覧 (キュー、ノード数、walltime、経過時間)
- `qstat -w`               # ジョブ名などを省略せず幅広く表示
- `qstat -H`: 終了済みジョブの履歴
- `qstat -t`              # 配列ジョブのサブジョブも表示
- `qsub run.sh`                        # ジョブ投入
- `qsub -v SUBSET=bearing_body run.sh` # 環境変数を渡して投入
- `qsub -I -q interact-g -l select=1 -l walltime=02:00:00 -W group_list=gj23`   # 対話ジョブ
- `qdel <JOBID>`                      # ジョブの削除
- `qstat -f <JOBID>`                   # ジョブの全情報
- `qstat --rscuse`                     # 資源の使用状況
- `qstat --nodeuse`                    # ノードの使用状況
- `qstat --limit`: 利用制限の確認
- `qstat --help`                       # このシステムの qstat のヘルプ
- `show_token`: Projectのtoken量の確認

# Commands for Wisteria system
- `pjstat`: 自分の(未完成)ジョブ一覧
- `pjstat -a`:他人のジョブも含め、システム上未完成ジョブ全ての詳細な一覧 (キュー、ノード数、walltime、経過時間)
- `pjstat -H`: 終了済みジョブの履歴