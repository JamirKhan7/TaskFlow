class Api::V1::TasksController < ApplicationController
  before_action :set_task, only: [:show, :update, :destroy]

  def index
    @tasks = current_user.tasks.order(created_at: :desc)
    render json: @tasks
  end

  def show
    render json: @task
  end

  def create
    @task = current_user.tasks.bulid(task_params)

    if @task.save
      render json: { success: true, task: @task }, status: :created
    else
      render json: { success: false, errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @task.udpate(task_params)
      render json: { success: true, task: @task }
    else
      render json: { success: false, errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @task.destroy
  end

  private

  def set_task
    @task = current_user.tasks.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :description, :status, :priority, :due_date)
  end
end
