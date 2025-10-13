<template>
  <div class="nk-content-wrap">
    <div class="nk-block-head nk-block-head-sm">
      <div class="nk-block-between">
        <div class="nk-block-head-content">
          <h3 class="nk-block-title page-title">To-Do</h3>
        </div>
        <div class="nk-block-head-content">
          <div class="toggle-wrap nk-block-tools-toggle">
            <a href="#" class="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu">
              <em class="icon ni ni-menu-alt-r"></em>
            </a>
            <div class="toggle-expand-content" data-content="pageMenu">
              <ul class="nk-block-tools g-3">
                
                <li class="nk-block-tools-opt">
                  <a href="javascript:void(0)" @click="add_item()"  class="btn btn-success">
                    <em class="icon ni ni-plus"></em>
                    <span>Add Board</span>
                    </a>
                  <a href="javascript:void(0)" id="bt1" style="display: none;"  data-bs-toggle="modal" 
                  data-bs-target="#modalBoard" class="btn btn-success">
                    <em class="icon ni ni-plus"></em>
                    <span>Add Board</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nk-block" v-if="boards.length<=0">
    <div class="card card-bordered" style="border-radius: 1rem; height:100%;">
              <div class="card-inner" style="text-align: center; width:100%; padding: 1rem;">
                <br>
                <div style="text-align: center; height:15rem; width:100%; padding: 1rem; margin-top: 3rem;">
                  <em style="font-size: 5rem;" class="icon ni ni-calendar-booking"></em>
                  <br>
                  <br>
                  <h6>No Boards Avialable</h6>
                  <p>No boards currently available for selection or viewing right now.</p>
                </div>
                <br>
                <br>
                <a href="javascript:void(0);" @click="add_item()" class="btn btn-success" style="width:30%; border-radius: .6rem;">
                  <span>Create Board</span>
                </a>
              </div>
            </div>
            </div>
    <div class="nk-block" v-if="boards.length>0">
      <div id="kanban" class="nk-kanban">
        <div class="kanban-container" style="width: 1280px;">
          <div :data-id="user.board_id" v-for="user in boards" :key="user" data-order="1" class="kanban-board" style="width: 320px; margin-left: 0px; margin-right: 0px;">
            <header class="kanban-board-header kanban-light">
              <div class="kanban-title-board">
                <div class="kanban-title-content">
                  <h6 class="title">{{ user.board_title }} &nbsp;&nbsp;|&nbsp;&nbsp; {{ user.board_status }}</h6>
                  <span class="badge rounded-pill bg-outline-light text-dark">{{ user.task_cnt }}</span>
                </div>
                <div class="kanban-title-content">
                  <div class="drodown">
                    <a href="#" class="dropdown-toggle btn btn-sm btn-icon btn-trigger me-n1" data-bs-toggle="dropdown">
                      <em class="icon ni ni-more-h"></em>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end">
                      <ul class="link-list-opt no-bdr">
                        <li>
                          <a href="javascript:void(0)" @click="edit_item(user)">
                            <em class="icon ni ni-edit"></em>
                            <span>Edit Board</span>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)" @click="add_task(user.board_id)">
                            <em class="icon ni ni-plus-sm"></em>
                            <span>Add Task</span>
                          </a>
                          <a href="javascript:void(0)"  data-bs-toggle="modal" id="bt2"
                          data-bs-target="#modalTask" style="display: none;">
                            <em class="icon ni ni-plus-sm"></em>
                            <span>Add Task</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <main class="kanban-drag">
              <a href="javascript:void(0)">
                <div class="kanban-item" @click="edit_task(user1)" style="border-radius: 1.5rem;"
                  v-for="user1 in tasks"  :key="user1">
                  <div class="kanban-item-title">
                    <h6 class="title">{{ user1.task_title }}</h6>
                  </div>
                  <div class="kanban-item-text">
                    <p>{{ user1.task_desc }}</p>
                  </div>
                  <ul class="kanban-item-tags">
                    <li>
                      <span class="badge bg-info">{{ user1.task_tags }}</span>
                    </li>
                  </ul>
                  <div class="kanban-item-meta">
                    <ul class="kanban-item-meta-list">
                      <li class="text-danger">
                        <em class="icon ni ni-calendar"></em>
                        <span>{{ user1.task_due_date }}</span>
                      </li>
                      <li>
                        <em class="icon ni ni-notes"></em>
                        <span>{{ user1.task_cat }}</span>
                      </li>
                    </ul>
                    <!-- <ul class="kanban-item-meta-list">
                      <li>
                        <em class="icon ni ni-clip"></em>
                        <span>1</span>
                      </li>
                      <li>
                        <em class="icon ni ni-comments"></em>
                        <span>4</span>
                      </li>
                    </ul> -->
                  </div>
                </div>
              </a>
            </main>
            <footer>
              <button  @click="add_task(user.board_id)" class="kanban-add-task btn btn-block">
                <em class="icon ni ni-plus-sm"></em>
                <span>Add another task</span>
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modalBoard">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">New Board</h5>
          <a href="#" class="close" data-bs-dismiss="modal" id="closeBt2" aria-label="Close">
            <em class="icon ni ni-cross"></em>
          </a>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addBoard1" class="form-validate is-alter">
            <div class="form-group">
              <label class="form-label" for="full-name">Title</label>
              <div class="form-control-wrap">
                <input type="text" class="form-control" v-model="board_title" required>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="page_desc">Description (Optional)</label>
              <div class="form-control-wrap">
                <textarea class="form-control no-resize" v-model="board_desc"></textarea>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Status</label>
              <div class="form-control-wrap">
                <select class="form-control" v-model="board_status">
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
            <br>
            <div :class="'alert alert-' + msgType + ' mb-xl-0'" role="alert" v-if="msgTxt">
              {{ msgTxt }}
            </div>
            <br>
            <div class="form-group">
              <button type="submit" class="btn btn-lg btn-success" style="border-radius: 0.6rem;"> {{ board_label }} </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modalTask">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">New Task</h5>
          <a href="#" class="close" data-bs-dismiss="modal" id="closeBt1" aria-label="Close">
            <em class="icon ni ni-cross"></em>
          </a>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addTask1" class="form-validate is-alter">
            <div class="row g-gs">
              <div class="col-sm-6">
              <div class="form-group">
                <label class="form-label" for="full-name">Title</label>
                <div class="form-control-wrap">
                  <input type="text" class="form-control" v-model="task_title" required>
                </div>
              </div>
              </div>
              <div class="col-sm-6">
              <div class="form-group">
                <label class="form-label">Type</label>
                <div class="form-control-wrap">
                  <select class="form-control" v-model="task_cat">
                    <option value="Normal">Normal</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Very Urgent">Very Urgent</option>
                  </select>
                </div>
              </div>
              </div>
              <div class="col-sm-6">
              <div class="form-group">
                <label class="form-label" for="full-name">#Tags</label>
                <div class="form-control-wrap">
                  <input type="text" class="form-control" v-model="task_tags" required>
                </div>
              </div>
              </div>
              <div class="col-sm-6">
              <div class="form-group">
                <label class="form-label" for="full-name">Due Date</label>
                <div class="form-control-wrap">
                  <input type="date" class="form-control" v-model="task_due_date" required>
                </div>
              </div>
              </div>
              <div class="col-sm-12">
              <div class="form-group">
                <label class="form-label" for="page_desc">Description (Optional)</label>
                <div class="form-control-wrap">
                  <textarea class="form-control no-resize" v-model="task_desc"></textarea>
                </div>
              </div>
              </div>
              <div class="col-sm-12">
              <div class="form-group">
                <label class="form-label">Status</label>
                <div class="form-control-wrap">
                  <select class="form-control" v-model="task_status">
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
              </div>
            </div>
            <br>
            <div :class="'alert alert-' + msgType + ' mb-xl-0'" role="alert" v-if="msgTxt">
              {{ msgTxt }}
            </div>
            <br>
            <div class="form-group">
              <button type="submit" class="btn btn-lg btn-success" style="border-radius: 0.6rem;"> {{ task_label }} </button>
              <button type="button" id="bt56" @click="del_task()" class="btn btn-lg btn-danger" style="border-radius: 0.6rem; margin-left: 1rem; display: none;"> Delete </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mainBaseUrl
  } from '@/apis/appconst';
  import {
    addTask,
    delTaskById,
    getTaskList
  } from '@/apis/taskapis';
  import {
    addBoard,
    getBoardList
  } from '@/apis/boardapis';
  export default {
    name: 'AppTodo',
    methods: {
      async getBList($pno) {
        this.page_no = $pno;
        const response = await getBoardList(this.ldata.user_id);
        if (response.status) {
          this.boards = response.records;
        }
      },
      async getTList() {
        const response = await getTaskList(this.ldata.user_id);
        if (response.status) {
          this.tasks = response.records;
        }
      },

      validateField(field, msg) {
      if ((field+"").length > 0) {

        return true;
      } else {
        this.msgType = "danger";
        this.msgTxt = msg;
        return false;
      }
    },
    edit_item($udt){
      this.board_id = $udt.board_id;
      this.board_desc = $udt.board_desc;
      this.board_title = $udt.board_title;
      this.board_status = $udt.board_status;
      this.board_label = "Update";
      document.getElementById("bt1").click();
    },
    add_item(){
      this.board_id = "";
      this.board_desc = "";
      this.board_title = "";
      this.board_status = "";
      this.board_label = "Create";
      document.getElementById("bt1").click();
    },
      async addBoard1() {
        if (this.validateField(this.board_title, 'Enter Title') &&
         this.validateField(this.board_desc, 'Enter Details') &&
          this.validateField(this.board_status, 'Select Status')) {
          this.msgType = "";
          this.msgTxt = "";
         
          const response = await addBoard(this.board_id, this.board_title, this.board_desc, this.board_status, this.ldata.user_id);
          if (response.status) {
            this.msgType = "success";
            this.msgTxt = response.message;
            document.getElementById("closeBt2").click();
            this.getBList();
          } else {
            this.msgType = "danger";
            this.msgTxt = response.message;
          }
        }
      },
      add_task($board_id){
      this.task_id = "";
      this.task_title = "";
      this.task_cat = "";
      this.task_desc = "";
      this.task_tags = "";
      this.task_status = "";
      this.task_due_date = "";
      this.task_board = $board_id;
      this.task_label = "Create";
      document.getElementById("bt56").style.display = "none";
      document.getElementById("bt2").click();
    },
    edit_task($task_dt){
      this.task_id = $task_dt.task_id;
      this.task_title = $task_dt.task_title;
      this.task_cat = $task_dt.task_cat;
      this.task_desc = $task_dt.task_desc;
      this.task_tags = $task_dt.task_tags;
      this.task_due_date = $task_dt.task_due_date;
      this.task_board = $task_dt.task_board;
      this.task_status = $task_dt.task_status;
      this.task_label = "Update";
      
      document.getElementById("bt56").style.display = "inline";
      document.getElementById("bt2").click();
    },
    async del_task(){
      const response = await delTaskById(this.task_id);
          if (response.status) {
            document.getElementById("closeBt1").click();
            this.getTList();
          }
    },
      async addTask1() {
        if (this.validateField(this.task_title, 'Enter Title') &&
         this.validateField(this.task_cat, 'Enter Category') &&
         this.validateField(this.task_desc, 'Enter Details') &&
         this.validateField(this.task_due_date, 'Enter Due Date') &&
         this.validateField(this.task_status, 'Select Status')) {
          this.msgType = "";
          this.msgTxt = "";
          const response = await addTask(this.task_id, this.task_title, this.task_cat, this.task_desc
          , this.task_due_date, this.task_status, this.task_tags, this.task_board, this.ldata.user_id);
          if (response.status) {
            this.msgType = "success";
            this.msgTxt = response.message;
            document.getElementById("closeBt1").click();
            this.getTList();
          } else {
            this.msgType = "danger";
            this.msgTxt = response.message;
          }
        }
      },
    },
    data() {
      return {
        base_url: "",
        boards: [],
        tasks: [],
        item_id: "",
        ldata: null,
        board_id: "",
        board_title: "",
        board_desc: "",
        board_status: "",
        task_id: "",
        task_title: "",
        task_cat: "",
        task_desc: "",
        task_due_date: "",
        task_status: "",
        task_tags: "",
        task_board: "",
        board_label:"Create",
        task_label:"Create"
      };
    },
    created() {
      this.base_url = mainBaseUrl;
      if (sessionStorage.getItem("ldata") && sessionStorage.getItem("ldata").length > 0) {
        this.ldata = JSON.parse(sessionStorage.getItem("ldata"));
        this.getBList();
        this.getTList();
      }
    },
  }
</script>
<style scoped></style>